steps = [
    [
        """
    CREATE TABLE reviews (
        id SERIAL PRIMARY KEY NOT NULL,
        date_time TIMESTAMP NOT NULL,
        rating INTEGER NOT NULL,
        description TEXT NOT NULL,
        ride_id INTEGER NOT NULL UNIQUE,
        FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE CASCADE,
        rider_id INTEGER NOT NULL,
        FOREIGN KEY (rider_id) REFERENCES accounts(id) ON DELETE CASCADE
    )
    """,
        # "Down" SQL statement
        """
    DROP TABLE reviews;
    """,
    ]
]
