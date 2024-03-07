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

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/api/reviews", response_model=List[ReviewOut])
def get_reviews(
    reviews: ReviewQueries = Depends(),
) -> ReviewOut:
    return reviews.get()


@router.post("/api/reviews", response_model=ReviewOut)
async def create_review(
    review: ReviewIn,
    reviews: ReviewQueries = Depends(),
) -> ReviewOut:
    return reviews.create(review)

@router.get("/api/review/{id}", response_model=ReviewOut)
def get_review(
    id: int,
    reviews: ReviewQueries = Depends(),
) -> ReviewOut:
    return reviews.get(id)
