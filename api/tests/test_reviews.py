from fastapi.testclient import TestClient
from queries.reviews import ReviewQueries
from main import app
from authenticator import authenticator

client = TestClient(app=app)


def fake_try_get_current_account_data():
    return {"id": "FAKE_ACCOUNT_ID"}


class FakeReviewsQueries:
    def create(self, review_in):
        review = review_in.dict()
        review["id"] = 0
        return review


def test_create_review():
    app.dependency_overrides[ReviewQueries] = FakeReviewsQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_try_get_current_account_data
    review_in = {
        "date_time": "2024-03-18T21:36:21.152000+00:00",
        "rating": 0,
        "description": "string",
    }
    res = client.post("/api/reviews", json=review_in)

    assert res.status_code == 200
    assert res.json() == {
        "id": 0,
        "date_time": "2024-03-18T21:36:21.152000+00:00",
        "rating": 0,
        "description": "string",
    }
