from fastapi.testclient import TestClient
from queries.tickets import TicketQueries
from main import app
from authenticator import authenticator

client = TestClient(app=app)

def fake_try_get_current_account_data():
    return {"id": "FAKE_ACCOUNT_ID"}

class FakeTicketQueries:
    def create(self, ticket_in):
        ticket = ticket_in.dict()
        ticket["id"] = 0
        return ticket

def test_create_ticket():
    app.dependency_overrides[TicketQueries] = FakeTicketQueries
    app.dependency_overrides[authenticator.try_get_current_account_data] = (fake_try_get_current_account_data)
    ticket_in = {
        "description": "string",
        "user_id": 0,
        "trip_id": 0,
        "date_time": "2024-03-18T21:36:21.152000+00:00"
    }
    res = client.post("/api/tickets", json=ticket_in)

    assert res.status_code == 200
    assert res.json () == {
        "id": 0,
        "description": "string",
        "user_id": 0,
        "trip_id": 0,
        "date_time": "2024-03-18T21:36:21.152000+00:00"
    }
