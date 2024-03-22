# This is for unit testing the create_ride endpoint in the api
# The test cases are for the following:
# 1. Test for creating a ride with valid data
# 2. Test for creating a ride with invalid data
# jwt token validation already tested in test_jwt_token_validation.py

from fastapi.testclient import TestClient
from queries.rides import RideQueries
from main import app
from authenticator import authenticator

client = TestClient(app)


def fake_try_get_current_account_data():
    return {"id": 12345}


class FakeRideQueries:
    def create(self, ride_in, account_id):
        ride = ride_in.dict()
        ride["id"] = 1
        ride["rider_id"] = account_id
        return ride


def test_create_ride():
    app.dependency_overrides[RideQueries] = FakeRideQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_try_get_current_account_data
    ride_in = {
        "date_time": "2024-03-18T21:36:21.152000+00:00",
        "pick_up_location": "string",
        "drop_off_location": "string",
        "map_url": "string",
        "instructions": "string",
    }
    res = client.post("/api/rides", json=ride_in)

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
