from authenticator import authenticator
from queries.accounts import AccountOut
from queries.trips import TripQueries
from typing import List
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from models import (
    TripIn,
    TripOut,
    HttpError
)

router = APIRouter()

@router.get("/api/trips", response_model=List[TripOut])
def get_trips(
    trips: TripQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> TripOut:
    if account_data:
        return trips.get()

@router.get("/api/trip/{trip_id}", response_model=TripOut)
def get_trip(
    trip_id: int,
    trips: TripQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> TripOut:
    if account_data:
        return trips.get_one(trip_id)

@router.get("/api/trips/others", response_model=List[TripOut])
def get_other_trips(
    trips: TripQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> TripOut:
    if account_data:
        return trips.get_other_trips(account_data.get("id"))

@router.get("/api/trips/mine", response_model=List[TripOut])
def get_my_trips(
    trips: TripQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> TripOut:
    return trips.get_mine(account_data.get("id"))

@router.get("/api/trips/mine-driver", response_model=List[TripOut])
def get_my_trips_driver(
    trips: TripQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> TripOut:
    return trips.get_mine_driver(account_data.get("id"))

@router.post("/api/trips", response_model=TripOut)
async def create_trip(
    trip: TripIn,
    trips: TripQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> TripOut:
    if account_data:
        return trips.create(trip, account_data.get("id"))

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )

@router.put("/api/trips/{trip_id}", response_model=TripOut)
async def update_trip(
    trip_id: int,
    trips: TripQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> TripOut:
    if account_data:
        return trips.update(account_data.get("id"), trip_id)

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )
