steps = [
    [
    """
    CREATE TABLE reviews (
        id SERIAL PRIMARY KEY NOT NULL,
        date_time TIMESTAMP NOT NULL,
        rating INTEGER NOT NULL,
        description TEXT NOT NULL,
        trip_id INTEGER NOT NULL UNIQUE,
        FOREIGN KEY (trip_id) REFERENCES trips(id),
        rider_id INTEGER NOT NULL,
        FOREIGN KEY (rider_id) REFERENCES accounts(id)
    )
    """,
    # "Down" SQL statement
    """
    DROP TABLE reviews;
    """
    ]
]
