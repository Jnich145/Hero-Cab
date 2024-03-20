from queries.reviews import ReviewQueries
from queries.accounts import AccountOut
from authenticator import authenticator
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
    ReviewIn,
    ReviewOut,
    HttpError
)

router = APIRouter()

@router.get("/api/reviews", response_model=List[ReviewOut])
def get_reviews(
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> ReviewOut:
    if account_data:
        return reviews.get()

@router.post("/api/reviews", response_model=ReviewOut)
async def create_review(
    review: ReviewIn,
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> ReviewOut:
    if account_data:
        return reviews.create(review)

@router.get("/api/reviews/{id}", response_model=ReviewOut)
def get_review(
    id: int,
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> ReviewOut:
    if account_data:
        return reviews.get(id)
