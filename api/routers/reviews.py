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
from typing import List

from queries.reviews import (
    ReviewIn,
    ReviewOut,
    ReviewQueries,
)

from queries.accounts import(
    AccountOut
)

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/api/reviews", response_model=List[ReviewOut])
def get_reviews(
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> ReviewOut:
    if account_data.get("email") == "admin":
        return reviews.get()


@router.post("/api/reviews", response_model=ReviewOut)
async def create_review(
    review: ReviewIn,
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> ReviewOut:
    print(account_data)
    if account_data:
        return reviews.create(review)

@router.get("/api/reviews/{id}", response_model=ReviewOut)
def get_review(
    id: int,
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> ReviewOut:
    if account_data.get("email") == "admin":
        return reviews.get(id)
