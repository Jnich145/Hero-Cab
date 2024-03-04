from pydantic import BaseModel
from datetime import datetime


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

class Profile(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    special_needs: str

class ProfileIn(BaseModel):
    email: str
    first_name: str
    last_name: str
    special_needs: str

class ProfileOut(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    special_needs: str


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

class ReviewOutWithProfile(ReviewOut):
    profile: Profile

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
