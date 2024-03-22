from jwtdown_fastapi.authentication import Authenticator
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MyAuthenticator(Authenticator):
    pass


class HttpError(BaseModel):
    detail: str


class DuplicateAccountError(ValueError):
    pass


class ValidationError(ValueError):
    pass


class UniqueViolation(ValueError):
    pass


class Account(BaseModel):
    id: int
    email: str
    hashed_password: str
    first_name: str
    last_name: str
    special_needs: bool
    phone_number: Optional[str]
    address: Optional[str]


class AccountIn(BaseModel):
    password: str
    email: str
    first_name: str
    last_name: str
    special_needs: bool


class AccountOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    special_needs: bool
    phone_number: Optional[str]
    address: Optional[str]


class AccountUpdateDetails(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    phone_number: Optional[str]
    address: Optional[str]
    special_needs: bool


class AccountUpdatePassword(BaseModel):
    password: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class DeleteStatus(BaseModel):
    status: bool


class Review(BaseModel):
    id: int
    date_time: datetime
    rating: int
    description: str
    ride_id: int
    rider_id: int


class ReviewIn(BaseModel):
    date_time: datetime
    rating: int
    description: str
    ride_id: int


class ReviewOut(BaseModel):
    id: int
    date_time: datetime
    rating: int
    description: str
    ride_id: int
    rider_id: int
    pick_up_location: Optional[str]
    drop_off_location: Optional[str]


class Ride(BaseModel):
    id: int
    date_time: datetime
    pick_up_location: str
    drop_off_location: str
    map_url: str
    instructions: str
    rider_id: int
    driver_id: Optional[int]


class RideIn(BaseModel):
    date_time: datetime
    pick_up_location: str
    drop_off_location: str
    map_url: str
    instructions: str


class RideOut(BaseModel):
    id: int
    date_time: datetime
    pick_up_location: str
    drop_off_location: str
    map_url: str
    instructions: str
    rider_id: int
    driver_id: Optional[int]


class Ticket(BaseModel):
    id: int
    description: str
    user_id: int
    ride_id: int
    date_time: datetime


class TicketIn(BaseModel):
    description: str
    user_id: int
    ride_id: int
    date_time: datetime


class TicketOut(BaseModel):
    id: int
    description: str
    user_id: int
    ride_id: int
    date_time: datetime
