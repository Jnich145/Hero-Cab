steps = [
    [
    """
    CREATE TABLE reviews (
        id SERIAL PRIMARY KEY NOT NULL,
        date_time TIMESTAMP NOT NULL,
        rating INTEGER NOT NULL,
        description TEXT NOT NULL
    )
    """,
    # "Down" SQL statement
    """
    DROP TABLE reviews;
    """
    ]
]
