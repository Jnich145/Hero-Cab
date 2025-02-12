steps = [
    [
        """
    CREATE TABLE accounts (
        id SERIAL PRIMARY KEY NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        special_needs BOOL NOT NULL,
        phone_number VARCHAR(255) NULL,
        address VARCHAR(255) NULL
    );
    """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
    """,
    ]
]
