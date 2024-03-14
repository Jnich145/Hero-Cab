steps = [
    [
        """
        ALTER TABLE trips
        ADD COLUMN status VARCHAR(255) NOT NULL DEFAULT 'not accepted';
        """,
        # "Down" SQL statement
        """
        ALTER TABLE trips
        DROP COLUMN status;
        """
    ],
]

# steps = [
#     [
#         """
#         ALTER TABLE trips
#         ADD COLUMN status BOOLEAN NOT NULL DEFAULT FALSE;
#         """,
#         # "Down" SQL statement
#         """
#         ALTER TABLE trips
#         DROP COLUMN status;
#         """
#     ],
# ]
