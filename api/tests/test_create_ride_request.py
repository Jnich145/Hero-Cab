# This is for unit testing the create_trip endpoint in the api
# The test cases are for the following:
# 1. Test for creating a trip with valid data
# 2. Test for creating a trip with invalid data
# jwt token validation already tested in test_jwt_token_validation.py

from fastapi.testclient import TestClient
from queries.trips import TripQueries
from main import app
from authenticator import authenticator

client = TestClient(app)


def fake_try_get_current_account_data():
    return {"id": 12345}


class FakeTripQueries:
    def create(self, trip_in, account_id):
        trip = trip_in.dict()
        trip["id"] = 1
        trip["rider_id"] = account_id
        return trip


def test_create_trip():
    app.dependency_overrides[TripQueries] = FakeTripQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_try_get_current_account_data
    trip_in = {
        "date_time": "2024-03-18T21:36:21.152000+00:00",
        "pick_up_location": "string",
        "drop_off_location": "string",
        "map_url": "string",
        "instructions": "string",
    }
    res = client.post("/api/trips", json=trip_in)

    assert res.status_code == 200
    assert res.json() == {
        "id": 1,
        "date_time": "2024-03-18T21:36:21.152000+00:00",
        "pick_up_location": "string",
        "drop_off_location": "string",
        "map_url": "string",
        "instructions": "string",
        "rider_id": 12345,
        "driver_id": None
    }
