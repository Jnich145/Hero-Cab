from pydantic import BaseModel
from queries.pool import pool
from models import Review, ReviewIn, ReviewOut
from typing import List, Optional

class ReviewQueries:
    def get(self) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM reviews
                    """
                )
                data = []
                for record in db:
                    review = ReviewOut(
                        id=record[0],
                        date_time=record[1],
                        rating=record[2],
                        description=record[3]
                    )
                    data.append(review)
                return data

    def get_one(self, id: int) -> Optional[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM reviews
                    WHERE id = %s
                    """
                    [id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                review = ReviewOut(
                    id=record[0],
                    date_time=record[1],
                    rating=record[2],
                    description=record[3]
                    )
                return review

    def create(self, review: ReviewIn) -> Review:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO reviews (
                        date_time
                        , rating
                        , description
                    )
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        review.date_time,
                        review.rating,
                        review.description,
                    ]
                )
                id = result.fetchone()[0]
                return Review(
                    id=id,
                    date_time=review.date_time,
                    rating=review.rating,
                    description=review.description
                )
