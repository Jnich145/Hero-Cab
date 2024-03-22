from queries.reviews import ReviewQueries
from queries.accounts import AccountOut
from authenticator import authenticator
from typing import List
from fastapi import Depends, HTTPException, status, APIRouter
from models import ReviewIn, ReviewOut, UniqueViolation

router = APIRouter()


@router.get("/api/reviews", response_model=List[ReviewOut])
def get_reviews(
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> ReviewOut:
    if account_data:
        return reviews.get()
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


@router.post("/api/reviews", response_model=ReviewOut)
async def create_review_as_rider(
    review: ReviewIn,
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> ReviewOut:
    if account_data:
        try:
            return reviews.create_review_as_rider(
                review, account_data.get("id")
            )
        except UniqueViolation:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Review for ride already exists",
            )
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


@router.get("/api/reviews/mine", response_model=List[ReviewOut] | None)
def get_my_reviews_driver(
    reviews: ReviewQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> ReviewOut | None:
    if account_data:
        return reviews.get_my_reviews_driver(account_data.get("id"))
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )
