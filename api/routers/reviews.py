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
async def create_review_as_rider(
    review: ReviewIn,
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> ReviewOut:
    if account_data:
        return reviews.create_review_as_rider(review, account_data.get("id"))
    #error should handle UniqueViolation: duplicate key value violates unique constraint

@router.get("/api/reviews/mine", response_model=List[ReviewOut] | None)
def get_my_reviews_driver(
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> ReviewOut | None:
    if account_data:
        return reviews.get_my_reviews_driver(account_data.get("id"))
