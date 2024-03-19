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
    ],
    [
    """
        CREATE TABLE trips (
            id SERIAL PRIMARY KEY NOT NULL,
            date_time TIMESTAMP NOT NULL,
            pick_up_location VARCHAR(255) NOT NULL,
            drop_off_location VARCHAR(255) NOT NULL,
            map_url VARCHAR(255) NOT NULL,
            instructions TEXT NOT NULL,
            rider_id INTEGER NOT NULL,
            driver_id INTEGER NULL,
            FOREIGN KEY (rider_id) REFERENCES accounts(id),
            FOREIGN KEY (driver_id) REFERENCES accounts(id)
        )
        """,
        # "Down" SQL statement
        """
        DROP TABLE trips;
        """
    ]

]
