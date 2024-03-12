from pydantic import BaseModel
from queries.pool import pool
from models import Trip, TripIn, TripOut
from typing import List, Optional

class TripQueries:
    def get(self) -> List[TripOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM trips
                    """
                )
                data = []
                for record in db:
                    trip = TripOut(
                        id=record[0],
                        date_time=record[1],
                        pick_up_location=record[2],
                        drop_off_location=record[3],
                        map_url=record[4],
                        instructions=record[5]
                    )
                    data.append(trip)
                return data

    def get_one(self, id: int) -> Optional[TripOut]:
        with pool.connection() as conn:
            with conn.cursor () as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM trips
                    WHERE id = %s
                    """
                    [id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                trip = TripOut(
                    id=record[0],
                    date_time=record[1],
                    pick_up_location=record[2],
                    drop_off_location=record[3],
                    map_url=record[4],
                    instructions=record[5]
                )
                return trip

    def create(self, trip: TripIn) -> Trip:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO trips (
                        date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                    )
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        trip.date_time,
                        trip.pick_up_location,
                        trip.drop_off_location,
                        trip.map_url,
                        trip.instructions
                    ]
                )
                id = result.fetchone()[0]
                return Trip(
                    id=id,
                    date_time=trip.date_time,
                    pick_up_location=trip.pick_up_location,
                    drop_off_location=trip.drop_off_location,
                    map_url=trip.map_url,
                    instructions=trip.instructions
                )
