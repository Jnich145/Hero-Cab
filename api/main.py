from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, profiles, reviews, trips, tickets


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(profiles.router)
app.include_router(reviews.router)
app.include_router(trips.router)
app.include_router(tickets.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
