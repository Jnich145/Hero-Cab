from queries.tickets import TicketQueries
from authenticator import authenticator
from queries.accounts import AccountOut
from typing import List
from fastapi import Depends, HTTPException, status, APIRouter
from models import TicketIn, TicketOut

router = APIRouter()


@router.get("/api/tickets", response_model=List[TicketOut])
def get_tickets(
    tickets: TicketQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> TicketOut:
    if account_data:
        return tickets.get()
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


@router.post("/api/tickets", response_model=TicketOut)
async def create_ticket(
    ticket: TicketIn,
    tickets: TicketQueries = Depends(),
    account_data: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> TicketOut:
    if account_data:
        return tickets.create(ticket)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )
