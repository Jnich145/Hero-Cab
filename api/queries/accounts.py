from pydantic import BaseModel
from queries.pool import pool
from models import Account, AccountIn, AccountOut, AccountOutWithPassword
from typing import List

class DuplicateAccountError(ValueError):
    pass

class AccountQueries:
    def get(self) -> List[AccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , email
                        , password
                        , first_name
                        , last_name
                        , special_needs
                    FROM account
                    """
                )
                data = []
                record = result.fetchone()
                for record in db:
                    account = AccountOut(
                        id=record[0],
                        email=record[1],
                        hashed_password=record[2],
                        first_name=record[3],
                        last_name=record[4],
                        special_needs=record[5]
                    )
                    data.append(account)
                return data

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO account (
                        email
                        , password
                        , first_name
                        , last_name
                        , special_needs
                    )
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.email,
                        hashed_password,
                        account.first_name,
                        account.last_name,
                        account.special_needs,
                    ],
                )
                id = result.fetchone()[0]

                return Account(
                    id=id,
                    email=account.email,
                    hashed_password=hashed_password,
                    first_name=account.first_name,
                    last_name=account.last_name,
                    special_needs=account.special_needs,
                )
