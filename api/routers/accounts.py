from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel
from typing import List, Optional

from queries.accounts import (
    Account,
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
    AccountUpdateWithoutPassword,
    AccountUpdatePassword,
    ValidationError
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())

@router.get("/api/accounts", response_model=List[AccountOut])
def get_accounts(
    accounts: AccountQueries = Depends(),
) -> AccountOut:
     return accounts.get()

@router.get("/api/accounts/{email}", response_model=AccountOut)
def get_account(
    email: str,
    accounts: AccountQueries = Depends(),
) -> AccountOut:
     return accounts.get_one(email)

@router.put("/api/accounts/update", response_model=Account | HttpError)
async def update_account(
    info: AccountUpdateWithoutPassword,
    verified_account: AccountOut = Depends(authenticator.try_get_current_account_data),
    accounts: AccountQueries = Depends()
):
    if verified_account.get("email") == info.email:
        # try:
        account = accounts.update(info)
        # except ValidationError:
        #     raise HTTPException(
        #         status_code=status.HTTP_403_FORBIDDEN,
        #         detail="Cannot edit account",
        #     )
        return account

@router.put("/api/accounts/update-password", response_model=AccountToken | HttpError)
async def update_password(
    info: AccountUpdatePassword,
    request: Request,
    response: Response,
    verified_account: AccountOut = Depends(authenticator.try_get_current_account_data),
    accounts: AccountQueries = Depends(),
):
    if verified_account.get("email") == info.email:
        hashed_password = authenticator.hash_password(info.password)
        account = accounts.update_password(info, hashed_password)
        authenticator.logout(request, response)
        form = AccountForm(username=info.email, password=info.password)
        token = await authenticator.login(response, request, form, accounts)
        return AccountToken(account=account, **token.dict())
