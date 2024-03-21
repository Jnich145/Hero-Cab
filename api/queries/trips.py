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
                    SELECT id
                        , date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id
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
                        instructions=record[5],
                        rider_id=record[6],
                        driver_id=record[7]
                    )
                    data.append(trip)
                return data

    def get_one(self, trip_id) -> TripOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id
                    FROM trips
                    WHERE id = %s;
                    """,
                    [trip_id]
                )
                record = result.fetchone()
                if record is None:
                    return None
                return TripOut(
                    id=trip_id,
                    date_time=record[0],
                    pick_up_location=record[1],
                    drop_off_location=record[2],
                    map_url=record[3],
                    instructions=record[4],
                    rider_id=record[5],
                    driver_id=record[6]
                )

    def get_other_trips(self, account_id) -> List[TripOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id
                    FROM trips
                    WHERE rider_id != %s AND driver_id IS NULL;
                    """,
                    [account_id]
                )
                data = []
                for record in db:
                    trip = TripOut(
                        id=record[0],
                        date_time=record[1],
                        pick_up_location=record[2],
                        drop_off_location=record[3],
                        map_url=record[4],
                        instructions=record[5],
                        rider_id=record[6],
                        driver_id=record[7]
                    )
                    data.append(trip)
                return data

    def get_mine(self, account_id) -> List[TripOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id
                    FROM trips
                    WHERE rider_id = %s
                    """,
                    [account_id]
                )
                data = []
                for record in db:
                    trip = TripOut(
                        id=record[0],
                        date_time=record[1],
                        pick_up_location=record[2],
                        drop_off_location=record[3],
                        map_url=record[4],
                        instructions=record[5],
                        rider_id=record[6],
                        driver_id=record[7]
                    )
                    data.append(trip)
                return data

    def get_mine_driver(self, account_id) -> List[TripOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id
                    FROM trips
                    WHERE driver_id = %s
                    """,
                    [account_id]
                )
                data = []
                for record in db:
                    trip = TripOut(
                        id=record[0],
                        date_time=record[1],
                        pick_up_location=record[2],
                        drop_off_location=record[3],
                        map_url=record[4],
                        instructions=record[5],
                        rider_id=record[6],
                        driver_id=record[7]
                    )
                    data.append(trip)
                return data

    def create(self, trip: TripIn, rider) -> TripOut:
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
                        , rider_id
                    )
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        trip.date_time,
                        trip.pick_up_location,
                        trip.drop_off_location,
                        trip.map_url,
                        trip.instructions,
                        rider
                    ]
                )
                id = result.fetchone()[0]
                return TripOut(
                    id=id,
                    date_time=trip.date_time,
                    pick_up_location=trip.pick_up_location,
                    drop_off_location=trip.drop_off_location,
                    map_url=trip.map_url,
                    instructions=trip.instructions,
                    rider_id=rider
                )

    def update(self, account_id, trip_id) -> TripOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT rider_id
                    FROM trips
                    WHERE id = %s;
                    """,
                    [trip_id]
                )
                trip_rider_id = result.fetchone()[0]
                if trip_rider_id == account_id:
                    raise ValueError("Rider cannot also be driver")
                result = db.execute(
                    """
                    UPDATE trips SET
                        driver_id = %s
                    WHERE id = %s
                    RETURNING id
                        , date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id;
                    """,
                    [
                        account_id,
                        trip_id
                    ]
                )
                record = result.fetchone()
                return TripOut(
                    id=record[0],
                    date_time=record[1],
                    pick_up_location=record[2],
                    drop_off_location=record[3],
                    map_url=record[4],
                    instructions=record[5],
                    rider_id=record[6],
                    driver_id=record[7]
                )
