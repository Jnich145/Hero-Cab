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

from queries.trips import (
    TripQueries,
    TripIn,
    TripOut,
)


class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/api/trips", response_model=List[TripOut])
def get_trips(
    trips: TripQueries = Depends(),
) -> TripOut:
    return trips.get()


@router.post("/api/trips", response_model=TripOut)
async def create_trip(
    trip: TripIn,
    trips: TripQueries = Depends(),
) -> TripOut:
    return trips.create(trip)
