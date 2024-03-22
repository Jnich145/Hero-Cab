from queries.pool import pool
from models import RideIn, RideOut
from typing import List


class RideQueries:
    def get(self) -> List[RideOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id
                    FROM rides
                    """
                )
                data = []
                for record in db:
                    ride = RideOut(
                        id=record[0],
                        date_time=record[1],
                        pick_up_location=record[2],
                        drop_off_location=record[3],
                        map_url=record[4],
                        instructions=record[5],
                        rider_id=record[6],
                        driver_id=record[7],
                    )
                    data.append(ride)
                return data

    def get_one(self, ride_id) -> RideOut:
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
                    FROM rides
                    WHERE id = %s;
                    """,
                    [ride_id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return RideOut(
                    id=ride_id,
                    date_time=record[0],
                    pick_up_location=record[1],
                    drop_off_location=record[2],
                    map_url=record[3],
                    instructions=record[4],
                    rider_id=record[5],
                    driver_id=record[6],
                )

    def get_other_rides(self, account_id) -> List[RideOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id
                    FROM rides
                    WHERE rider_id != %s AND driver_id IS NULL;
                    """,
                    [account_id],
                )
                data = []
                for record in db:
                    ride = RideOut(
                        id=record[0],
                        date_time=record[1],
                        pick_up_location=record[2],
                        drop_off_location=record[3],
                        map_url=record[4],
                        instructions=record[5],
                        rider_id=record[6],
                        driver_id=record[7],
                    )
                    data.append(ride)
                return data

    def get_mine(self, account_id) -> List[RideOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id
                    FROM rides
                    WHERE rider_id = %s
                    """,
                    [account_id],
                )
                data = []
                for record in db:
                    ride = RideOut(
                        id=record[0],
                        date_time=record[1],
                        pick_up_location=record[2],
                        drop_off_location=record[3],
                        map_url=record[4],
                        instructions=record[5],
                        rider_id=record[6],
                        driver_id=record[7],
                    )
                    data.append(ride)
                return data

    def get_mine_driver(self, account_id) -> List[RideOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                        , date_time
                        , pick_up_location
                        , drop_off_location
                        , map_url
                        , instructions
                        , rider_id
                        , driver_id
                    FROM rides
                    WHERE driver_id = %s
                    """,
                    [account_id],
                )
                data = []
                for record in db:
                    ride = RideOut(
                        id=record[0],
                        date_time=record[1],
                        pick_up_location=record[2],
                        drop_off_location=record[3],
                        map_url=record[4],
                        instructions=record[5],
                        rider_id=record[6],
                        driver_id=record[7],
                    )
                    data.append(ride)
                return data

    def create(self, ride: RideIn, rider_id) -> RideOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO rides (
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
                        ride.date_time,
                        ride.pick_up_location,
                        ride.drop_off_location,
                        ride.map_url,
                        ride.instructions,
                        rider_id,
                    ],
                )
                id = result.fetchone()[0]
                return RideOut(
                    id=id,
                    date_time=ride.date_time,
                    pick_up_location=ride.pick_up_location,
                    drop_off_location=ride.drop_off_location,
                    map_url=ride.map_url,
                    instructions=ride.instructions,
                    rider_id=rider_id,
                )

    def delete(self, account_id, ride_id) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                    FROM rides;
                    """,
                )
                rides = [record[0] for record in db]
                if ride_id not in rides:
                    raise ValueError("ride does not exist")
                result = db.execute(
                    """
                    SELECT rider_id
                    FROM rides
                    WHERE id = %s;
                    """,
                    [ride_id],
                )
                ride_rider_id = result.fetchone()[0]
                if ride_rider_id != account_id:
                    raise ValueError("Cannot delete other user's rides")
                result = db.execute(
                    """
                    DELETE FROM rides
                    WHERE id = %s
                    """,
                    [ride_id],
                )
                return True

    def accept_ride(self, account_id, ride_id) -> RideOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                    FROM rides;
                    """,
                )
                rides = [record[0] for record in db]
                if ride_id not in rides:
                    raise ValueError("Ride does not exist")
                result = db.execute(
                    """
                    SELECT rider_id
                    FROM rides
                    WHERE id = %s;
                    """,
                    [ride_id],
                )
                ride_rider_id = result.fetchone()[0]
                if ride_rider_id == account_id:
                    raise ValueError("Rider cannot also be driver")
                result = db.execute(
                    """
                    UPDATE rides SET
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
                    [account_id, ride_id],
                )
                record = result.fetchone()
                return RideOut(
                    id=record[0],
                    date_time=record[1],
                    pick_up_location=record[2],
                    drop_off_location=record[3],
                    map_url=record[4],
                    instructions=record[5],
                    rider_id=record[6],
                    driver_id=record[7],
                )

    def reject_ride(self, account_id, ride_id) -> RideOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                    FROM rides;
                    """,
                )
                rides = [record[0] for record in db]
                if ride_id not in rides:
                    raise ValueError("ride does not exist")
                result = db.execute(
                    """
                    SELECT driver_id
                    FROM rides
                    WHERE id = %s;
                    """,
                    [ride_id],
                )
                ride_driver_id = result.fetchone()[0]
                if ride_driver_id != account_id:
                    raise ValueError(
                        "Cannot reject ride where you are not the driver"
                    )
                result = db.execute(
                    """
                    UPDATE rides SET
                        driver_id = NULL
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
                    [ride_id],
                )
                record = result.fetchone()
                return RideOut(
                    id=record[0],
                    date_time=record[1],
                    pick_up_location=record[2],
                    drop_off_location=record[3],
                    map_url=record[4],
                    instructions=record[5],
                    rider_id=record[6],
                    driver_id=record[7],
                )
