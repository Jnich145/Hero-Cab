from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from jwtdown_fastapi.authentication import Token
from queries.accounts import AccountOut
from authenticator import authenticator

from pydantic import BaseModel
from typing import List

from queries.tickets import (
    TicketIn,
    TicketOut,
    TicketQueries,
)

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/api/tickets", response_model=List[TicketOut])
def get_tickets(
    tickets: TicketQueries = Depends(),
) -> TicketOut:
    return tickets.get()


@router.post("/api/tickets", response_model=TicketOut)
async def create_ticket(
    ticket: TicketIn,
    tickets: TicketQueries = Depends(),
    account_data: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> TicketOut:
    if account_data:
        return tickets.create(ticket)
