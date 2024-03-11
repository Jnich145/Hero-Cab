from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Account(BaseModel):
    id: int
    email: str
    hashed_password: str
    first_name: str
    last_name: str
    special_needs: bool


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

class AccountOutWithPassword(AccountOut):
    hashed_password: str


class DeleteStatus(BaseModel):
    status: bool

class Review(BaseModel):
    id: int
    date_time: datetime
    rating: int
    description: str

class ReviewIn(BaseModel):
    date_time: datetime
    rating: int
    description: str

class ReviewOut(BaseModel):
    id: int
    date_time: datetime
    rating: int
    description: str

class Trip(BaseModel):
    id: int
    date_time: datetime
    pick_up_location: str
    drop_off_location: str
    map_url: str
    instructions: str

class TripIn(BaseModel):
    date_time: datetime
    pick_up_location: str
    drop_off_location: str
    map_url: str
    instructions: str

class TripOut(BaseModel):
    id: int
    date_time: datetime
    pick_up_location: str
    drop_off_location: str
    map_url: str
    instructions: str

class Ticket(BaseModel):
    id: int
    description: str
    user_id: int
    trip_id: int
    date_time: datetime

class TicketIn(BaseModel):
    description: str
    user_id: int
    trip_id: int
    date_time: datetime

class TicketOut(BaseModel):
    id: int
    description: str
    user_id: int
    trip_id: int
    date_time: datetime
