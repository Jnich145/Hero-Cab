from fastapi.testclient import TestClient
from queries.reviews import ReviewQueries
from main import app
from authenticator import authenticator

client = TestClient(app=app)


def fake_try_get_current_account_data():
    return {"id": 12345}


class FakeReviewsQueries:
    def create_review_as_rider(self, review_in, account_id):
        review = review_in.dict()
        review["id"] = 1
        review["rider_id"] = account_id
        return review


def test_create_review():
    app.dependency_overrides[ReviewQueries] = FakeReviewsQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_try_get_current_account_data
    review_in = {
        "date_time": "2024-03-18T21:36:21.152000+00:00",
        "rating": 1,
        "description": "string",
        "ride_id": 1,
    }
    res = client.post("/api/reviews", json=review_in)

    assert res.status_code == 200
    assert res.json() == {
        "id": 1,
        "date_time": "2024-03-18T21:36:21.152000+00:00",
        "rating": 1,
        "description": "string",
        "ride_id": 1,
        "rider_id": 12345,
        "pick_up_location": None,
        "drop_off_location": None,
    }
