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

from queries.profiles import (
    ProfileIn,
    ProfileOut,
    ProfileQueries,
)

    
class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/api/profiles", response_model=List[ProfileOut])
def get_profiles(
    profiles: ProfileQueries = Depends(),
) -> ProfileOut:
    return profiles.get()


@router.post("/api/profiles", response_model=ProfileOut)
async def create_profile(
    profile: ProfileIn,
    profiles: ProfileQueries = Depends(),
) -> ProfileOut:
    return profiles.create(profile)