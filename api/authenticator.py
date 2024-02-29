import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries, AccountOut, AccountOutWithPassword


class DuplicateAccountError(ValueError):
    pass


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(email)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        # Return the email and the data for the cookie.
        # You must return TWO values from this method.
        return account.email, AccountOut(**account.dict())


# Create paths to the private and public key files
private_key_path = os.path.join(certs_directory, "RS256.key")
public_key_path = os.path.join(certs_directory, "RS256.key.pub")

# Read the contents of the private and public key files
private_key = open('/path/to/RS256.key', encoding="utf-8")
public_key = open('/path/to/RS256.key.pub', encoding="utf-8")

# Use your private and public keys in the authenticator
authenticator = MyAuthenticator(
    private_key,
    algorithm=ALGORITHMS.RS256,
    public_key=public_key,
)
