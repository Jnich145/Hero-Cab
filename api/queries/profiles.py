from pydantic import BaseModel
from queries.pool import pool
from models import Profile, ProfileIn, ProfileOut
from typing import List, Optional

class ProfileQueries:
    def get(self) -> List[ProfileOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
        """
        SELECT id
            , email
            , first_name
            , last_name
            , special_needs
        FROM profile

        """

                )
                data = []
                for record in db:
                    profile = ProfileOut(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        email=record[3],
                        special_needs=record[4]
                    )
                    data.append(profile)
                return data

    def get_one(self, id: int) -> Optional[ProfileOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM profile
                    WHERE id = %s
                    """,
                    [id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                profile = ProfileOut(
                    id=record[0],
                    email=record[1],
                    first_name=record[2],
                    last_name=record[3],
                    special_needs=record[4],
                    )
                return profile
    def create(self, profile: ProfileIn) -> Profile:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO profile (
                        email
                        , first_name
                        , last_name
                        , special_needs
                    )
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        profile.email,
                        profile.first_name,
                        profile.last_name,
                        profile.special_needs,
                    ],
                )
                id = result.fetchone()[0]
                return Profile(
                    id=id,
                    email=profile.email,
                    first_name=profile.first_name,
                    last_name=profile.last_name,
                    special_needs=profile.special_needs
                )
