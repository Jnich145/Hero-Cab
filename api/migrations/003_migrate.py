steps = [
    [
"""
        CREATE TABLE profile (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            special_needs TEXT NOT NULL
            
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE profile;
        """
    ],
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
            instructions TEXT NOT NULL
        )
        """,
        # "Down" SQL statement
        """
        DROP TABLE trips;
        """
    ]
    
]
