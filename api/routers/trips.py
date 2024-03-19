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

from queries.trips import (
    TripQueries,
    TripIn,
    TripOut,
)

from queries.accounts import(
    AccountOut
)

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/api/trips", response_model=List[TripOut])
def get_trips(
    trips: TripQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> TripOut:
    if account_data:
        return trips.get()

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




@router.post("/api/trips", response_model=TripOut)
async def create_trip(
    trip: TripIn,
    trips: TripQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> TripOut:
    # print(account_data)
    if account_data:
        return trips.create(trip, account_data.get("id"))

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )

@router.put("/api/trips/{id}", response_model=TripOut)
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

# @router.get("/api/trips/{id}", response_model=TripOut)
# def get_trip(
#     id: int,
#     trips: TripQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ) -> TripOut:
#     trip = trips.get_one(id)
#     if trip is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Trip not found",
#         )
#     return trip

# Another Attempt
# @router.get("/api/trips/{trip_id}")
# def get_trip(
#     trip_id: int,
#     repo: TripQueries = Depends(),
# ) -> Optional[TripOut]:
#     return repo.get_one(trip_id)

# @router.put("/api/trips/{id}", response_model=TripOut)
# async def update_trip(
#     id: int,
#     trip: TripIn,
#     trips: TripQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ) -> TripOut:
#     if account_data:
#         return trips.update(id, trip)

#     raise HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Unauthorized",
#     )

# @router.delete("/api/trips/{id}")
# async def delete_trip(
#     id: int,
#     trips: TripQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ) -> Response:
#     if account_data:
#         trips.delete(id)
#         return Response(status_code=status.HTTP_204_NO_CONTENT)

#     raise HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Unauthorized",
#     )
