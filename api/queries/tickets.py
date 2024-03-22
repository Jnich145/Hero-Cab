from queries.pool import pool
from models import Ticket, TicketIn, TicketOut
from typing import List, Optional


class TicketQueries:
    def get(self) -> List[TicketOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM tickets
                    """
                )
                data = []
                for record in db:
                    ticket = TicketOut(
                        id=record[0],
                        description=record[1],
                        user_id=record[2],
                        ride_id=record[3],
                        date_time=record[4],
                    )
                    data.append(ticket)
                return data

    def get_one(self, id: int) -> Optional[TicketOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM tickets
                    WHERE id = %s
                    """[
                        id
                    ],
                )
                record = result.fetchone()
                if record is None:
                    return None
                Ticket = TicketOut(
                    id=record[0],
                    description=record[1],
                    user_id=record[2],
                    ride_id=record[3],
                    date_time=record[4],
                )
                return Ticket

    def create(self, ticket: TicketIn) -> Ticket:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO tickets (
                        description
                        , user_id
                        , ride_id
                        , date_time
                    )
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        ticket.description,
                        ticket.user_id,
                        ticket.ride_id,
                        ticket.date_time,
                    ],
                )
                id = result.fetchone()[0]
                return Ticket(
                    id=id,
                    description=ticket.description,
                    user_id=ticket.user_id,
                    ride_id=ticket.ride_id,
                    date_time=ticket.date_time,
                )
