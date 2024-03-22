from queries.pool import pool
from models import ReviewIn, ReviewOut
from typing import List
from models import UniqueViolation


class ReviewQueries:
    def get(self) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT r.*, t.pick_up_location, t.drop_off_location
                    FROM reviews r
                    JOIN rides t ON r.ride_id = t.id
                    """
                )
                data = []
                for record in db:
                    review = ReviewOut(
                        id=record[0],
                        date_time=record[1],
                        rating=record[2],
                        description=record[3],
                        ride_id=record[4],
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
                    FROM rides
                    WHERE id = %s;
                    """,
                    [review.ride_id],
                )
                record = result.fetchone()
                ride_rider_id = record[0]
                ride_driver_id = record[1]
                if ride_rider_id != rider_id:
                    raise ValueError("Cannot review other user's rides")
                if not ride_driver_id:
                    raise ValueError("Ride has not yet been accepted")

                db.execute(
                    """
                    SELECT ride_id
                    FROM reviews
                    """,
                )
                data = [record[0] for record in db]
                if data and review.ride_id in data[0]:
                    raise UniqueViolation("Review for ride already exists")

                result = db.execute(
                    """
                    INSERT INTO reviews (
                        date_time
                        , rating
                        , description
                        , ride_id
                        , rider_id
                    )
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        review.date_time,
                        review.rating,
                        review.description,
                        review.ride_id,
                        rider_id,
                    ],
                )
                id = result.fetchone()[0]
                return ReviewOut(
                    id=id,
                    date_time=review.date_time,
                    rating=review.rating,
                    description=review.description,
                    ride_id=review.ride_id,
                    rider_id=rider_id,
                )

    def get_my_reviews_driver(self, account_id) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT r.*, t.pick_up_location, t.drop_off_location
                    FROM reviews r
                    JOIN rides t ON r.ride_id = t.id
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
                        ride_id=record[4],
                        rider_id=record[5],
                        pick_up_location=record[6],
                        drop_off_location=record[7],
                    )
                    data.append(review)
                return data
