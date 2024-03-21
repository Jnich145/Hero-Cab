steps = [
    [
        """
    CREATE TABLE tickets (
        id SERIAL PRIMARY KEY NOT NULL,
        description TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        trip_id INTEGER NOT NULL,
        date_time TIMESTAMP NOT NULL
    );
    """,
        # "Down" SQL statement
        """
    DROP TABLE tickets;
    """,
    ],
]
