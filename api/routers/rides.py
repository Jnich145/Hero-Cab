from authenticator import authenticator
from queries.accounts import AccountOut
from queries.rides import RideQueries
from typing import List
from fastapi import Depends, HTTPException, status, APIRouter
from models import RideIn, RideOut

router = APIRouter()


@router.get("/api/rides", response_model=List[RideOut])
def get_rides(
    rides: RideQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> RideOut:
    if account_data:
        return rides.get()
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


@router.get("/api/ride/{ride_id}", response_model=RideOut)
def get_ride(
    ride_id: int,
    rides: RideQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> RideOut:
    if account_data:
        return rides.get_one(ride_id)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


@router.get("/api/rides/others", response_model=List[RideOut])
def get_rides_of_other_users(
    rides: RideQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> RideOut:
    if account_data:
        return rides.get_other_rides(account_data.get("id"))
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


@router.get("/api/rides/mine", response_model=List[RideOut])
def get_my_rides_rider(
    rides: RideQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> RideOut:
    if account_data:
        return rides.get_mine(account_data.get("id"))
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


@router.get("/api/rides/mine/driver", response_model=List[RideOut])
def get_my_rides_driver(
    rides: RideQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> RideOut:
    if account_data:
        return rides.get_mine_driver(account_data.get("id"))
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


@router.post("/api/rides", response_model=RideOut)
async def create_ride(
    ride: RideIn,
    rides: RideQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> RideOut:
    if account_data:
        return rides.create(ride, account_data.get("id"))
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )

@router.delete("/api/rides/{ride_id}", response_model=bool)
async def delete_ride(
    ride_id: int,
    rides: RideQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> bool:
    if account_data:
        try:
            return rides.delete(account_data.get("id"), ride_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ride does not exist",
            )
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )

@router.put("/api/rides/{ride_id}", response_model=RideOut)
async def accept_ride(
    ride_id: int,
    rides: RideQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> RideOut:
    if account_data:
        return rides.accept_ride(account_data.get("id"), ride_id)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


@router.put("/api/rides/{ride_id}/reject", response_model=RideOut)
async def reject_ride(
    ride_id: int,
    rides: RideQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> RideOut:
    if account_data:
        try:
            return rides.reject_ride(account_data.get("id"), ride_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot reject ride where you are not the driver",
            )
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )
