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
                        , status
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
                        status=record[6]
                    )
                    data.append(trip)
                return data

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
                        , status
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
                        trip.status
                    ]
                )
                id = result.fetchone()[0]
                return Trip(
                    id=id,
                    date_time=trip.date_time,
                    pick_up_location=trip.pick_up_location,
                    drop_off_location=trip.drop_off_location,
                    map_url=trip.map_url,
                    instructions=trip.instructions,
                    status=trip.status
                )
            
    # def get_one(self, id: int) -> Optional[TripOut]:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             result = db.execute(
    #                 """
    #                 SELECT *
    #                 FROM trips
    #                 WHERE id = %s
    #                 """
    #                 [id],
    #             )
    #             record = result.fetchone()
    #             if record is None:
    #                 return None
    #             trip = TripOut(
    #                 id=record[0],
    #                 date_time=record[1],
    #                 pick_up_location=record[2],
    #                 drop_off_location=record[3],
    #                 map_url=record[4],
    #                 instructions=record[5],
    #                 status=record[6]
    #             )
    #             return trip

    # def update_trip(self, id: int, pick_up_location: str, drop_off_location: str, instructions: str, status: str) -> bool:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             result = db.execute(
    #                 """
    #                 UPDATE trips
    #                 SET pick_up_location = %s,
    #                     drop_off_location = %s,
    #                     instructions = %s,
    #                     status = %s
    #                 WHERE id = %s
    #                 """,
    #                 (pick_up_location, drop_off_location, instructions, status, id)
    #             )
    #             conn.commit()  # Commit the transaction to save changes
    #             return db.rowcount > 0  # Return True if any rows were updated, otherwise False
            
    # def delete(self, id: int) -> None:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             db.execute(
    #                 """
    #                 DELETE FROM trips
    #                 WHERE id = %s
    #                 """,
    #                 [id]
    #             )
    #             return None
    
    # def accept_trip(self, id: int) -> Optional[TripOut]:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             result = db.execute(
    #                 """
    #                 UPDATE trips
    #                 SET status = 'accepted'
    #                 WHERE id = %s
    #                 RETURNING id;
    #                 """,
    #                 [id]
    #             )
    #             record = result.fetchone()
    #             if record is None:
    #                 return None
    #             trip = TripOut(
    #                 id=record[0],
    #                 date_time=trip.date_time,
    #                 pick_up_location=trip.pick_up_location,
    #                 drop_off_location=trip.drop_off_location,
    #                 map_url=trip.map_url,
    #                 instructions=trip.instructions,
    #                 status=trip.status
    #             )
    #             return trip
    
    # def reject_trip(self, id: int) -> Optional[TripOut]:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             result = db.execute(
    #                 """
    #                 UPDATE trips
    #                 SET status = 'rejected'
    #                 WHERE id = %s
    #                 RETURNING id;
    #                 """,
    #                 [id]
    #             )
    #             record = result.fetchone()
    #             if record is None:
    #                 return None
    #             trip = TripOut(
    #                 id=record[0],
    #                 date_time=trip.date_time,
    #                 pick_up_location=trip.pick_up_location,
    #                 drop_off_location=trip.drop_off_location,
    #                 map_url=trip.map_url,
    #                 instructions=trip.instructions,
    #                 status=trip.status
    #             )
    #             return trip
            
    # def complete_trip(self, id: int) -> Optional[TripOut]:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             result = db.execute(
    #                 """
    #                 UPDATE trips
    #                 SET status = 'completed'
    #                 WHERE id = %s
    #                 RETURNING id;
    #                 """,
    #                 [id]
    #             )
    #             record = result.fetchone()
    #             if record is None:
    #                 return None
    #             trip = TripOut(
    #                 id=record[0],
    #                 date_time=trip.date_time,
    #                 pick_up_location=trip.pick_up_location,
    #                 drop_off_location=trip.drop_off_location,
    #                 map_url=trip.map_url,
    #                 instructions=trip.instructions,
    #                 status=trip.status
    #             )
    #             return trip
            
    # def cancel_trip(self, id: int) -> Optional[TripOut]:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             result = db.execute(
    #                 """
    #                 UPDATE trips
    #                 SET status = 'cancelled'
    #                 WHERE id = %s
    #                 RETURNING id;
    #                 """,
    #                 [id]
    #             )
    #             record = result.fetchone()
    #             if record is None:
    #                 return None
    #             trip = TripOut(
    #                 id=record[0],
    #                 date_time=trip.date_time,
    #                 pick_up_location=trip.pick_up_location,
    #                 drop_off_location=trip.drop_off_location,
    #                 map_url=trip.map_url,
    #                 instructions=trip.instructions,
    #                 status=trip.status
    #             )
    #             return trip
            
    
