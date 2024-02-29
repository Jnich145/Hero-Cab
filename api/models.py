from pydantic import BaseModel


class Account(BaseModel):
    id: int
    email: str
    hashed_password: str
    first_name: str
    last_name: str


class AccountIn(BaseModel):
    password: str
    email: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str


class DeleteStatus(BaseModel):
    status: bool
