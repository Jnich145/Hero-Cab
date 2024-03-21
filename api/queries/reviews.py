from queries.pool import pool
from models import ReviewIn, ReviewOut
from typing import List


class ReviewQueries:
    def get(self) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT r.*, t.pick_up_location, t.drop_off_location
                    FROM reviews r
                    JOIN trips t ON r.trip_id = t.id
                    """
                )
                data = []
                for record in db:
                    review = ReviewOut(
                        id=record[0],
                        date_time=record[1],
                        rating=record[2],
                        description=record[3],
                        trip_id=record[4],
                        rider_id=record[5],
                        pick_up_location=record[6],
                        drop_off_location=record[7]
                    )
                    data.append(review)
                return data

    def create_review_as_rider(self, review: ReviewIn, rider_id) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT rider_id, driver_id
                    FROM trips
                    WHERE id = %s;
                    """,
                    [review.trip_id],
                )
                record = result.fetchone()
                trip_rider_id = record[0]
                trip_driver_id = record[1]
                if trip_rider_id != rider_id:
                    raise ValueError("Cannot review other user's trips")
                if not trip_driver_id:
                    raise ValueError("Trip has not yet been accepted")

                result = db.execute(
                    """
                    INSERT INTO reviews (
                        date_time
                        , rating
                        , description
                        , trip_id
                        , rider_id
                    )
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        review.date_time,
                        review.rating,
                        review.description,
                        review.trip_id,
                        rider_id,
                    ],
                )
                id = result.fetchone()[0]
                return ReviewOut(
                    id=id,
                    date_time=review.date_time,
                    rating=review.rating,
                    description=review.description,
                    trip_id=review.trip_id,
                    rider_id=rider_id,
                )

    def get_my_reviews_driver(self, account_id) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT r.*, t.pick_up_location, t.drop_off_location
                    FROM reviews r
                    JOIN trips t ON r.trip_id = t.id
                    WHERE t.driver_id = %s;
                    """,
                    [account_id],
                )
                data = []
                if db.rowcount == 0:
                    return data
                for record in db:
                    review = ReviewOut(
                        id=record[0],
                        date_time=record[1],
                        rating=record[2],
                        description=record[3],
                        trip_id=record[4],
                        rider_id=record[5],
                        pick_up_location=record[6],
                        drop_off_location=record[7],
                    )
                    data.append(review)
                return data
