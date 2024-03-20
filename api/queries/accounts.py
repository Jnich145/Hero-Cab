from models import Account, AccountIn, AccountOut, AccountOutWithPassword, AccountUpdateDetails
from queries.pool import pool
from typing import List

class AccountQueries:
    def get(self) -> List[AccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , email
                        , first_name
                        , last_name
                        , special_needs
                        , phone_number
                        , address
                    FROM accounts
                    """
                )
                data = []
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

    def get_one(self, email: str) -> AccountOutWithPassword:
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
                        , phone_number
                        , address
                    FROM accounts
                    WHERE email = %s;
                    """,
                    (email,),
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOutWithPassword(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    first_name=record[3],
                    last_name=record[4],
                    special_needs=record[5],
                    phone_number=record[6],
                    address=record[7]
                )

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts (
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

    def update(self, account: AccountUpdateDetails, email) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE accounts SET
                        first_name = CASE WHEN %s != '' THEN %s ELSE first_name END,
                        last_name = CASE WHEN %s != '' THEN %s ELSE last_name END,
                        phone_number = CASE WHEN %s != '' THEN %s ELSE phone_number END,
                        address = CASE WHEN %s != '' THEN %s ELSE address END,
                        special_needs = %s
                    WHERE email = %s
                    RETURNING id, password;
                    """,
                    [
                        account.first_name,
                        account.first_name,
                        account.last_name,
                        account.last_name,
                        account.phone_number,
                        account.phone_number,
                        account.address,
                        account.address,
                        account.special_needs,
                        email
                    ],
                )
                record = result.fetchone()
                return Account(
                    id=record[0],
                    email=email,
                    hashed_password=record[1],
                    first_name=account.first_name,
                    last_name=account.last_name,
                    special_needs=account.special_needs,
                    phone_number=account.phone_number,
                    address=account.address
                )

    def update_password(self, hashed_password: str, email) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE accounts SET
                        password = %s
                    WHERE email = %s
                    RETURNING id, first_name, last_name, special_needs;
                    """,
                    [
                        hashed_password,
                        email
                    ],
                )
                record = result.fetchone()

                return Account(
                    id=record[0],
                    email=email,
                    hashed_password=hashed_password,
                    first_name=record[1],
                    last_name=record[2],
                    special_needs=record[3],
                )
