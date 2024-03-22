## API Endpoints
We have utilized FastAPI for our backend functionality. FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints. It is designed to be easy to use and efficient, with automatic validation of request and response data, automatic generation of interactive API documentation, and high-performance asynchronous support.

FastAPI provides a simple and intuitive way to define API endpoints using Python functions. It supports various HTTP methods such as GET, POST, PUT, DELETE, etc., and allows you to define request and response models using Python type hints. FastAPI also supports automatic serialization and deserialization of JSON data.

With FastAPI, you can easily create RESTful API endpoints for different resources such as manufacturers, vehicle models, and automobiles. It provides a clean and structured way to handle HTTP requests and responses, making it easier to develop and maintain your API.

To get started with FastAPI, you can install it using pip.

Please see the following router endpoints for further information:

1. Accounts/ Token

    - Requires user to create new account with email as username and password that follows a regular expression checked format for strength suggestions. 

2. Reviews

    - Requires a user to create an account, be logged into the account, and have submitted a ride request that a driver has accepted and completed. Once these requirements are satisfied, the user can submit a review with a rating out on a scale out of 5. Users may also submit details about the driver and trip. 

3. Tickets (Currently in Development)

4. Trips 

    - Users can post new trips as a rider or accept trips as a driver. Each type of user can view a history of trip requests or trip instances of acceptance respectively.

Token Port: http://localhost:8100/

***Account and Token RESTful API endpoints***

| Request Method  | Url                               | What it does                                                    |
| ----------------|:---------------------------------:|:---------------------------------------------------------------:|
| GET             | /token/                           | Assigns an authentication token to a newly created user account |
| POST            | /token/                           | This is used as a login for a user account                      |
| DELETE          | /token/                           | This is used as the logout for the user account                 |
| GET             | /accounts/                        | Returns a list of registered user accounts                      |
| POST            | /accounts/                        | Allows new user account creation                                |
| GET             | /account/mine                     | Returns a user account based on logged in user                  |
| PUT             | /api/accounts/update              | Allows user to update username/ email, first and last name      |
| PUT             | /api/accounts/update-password/    | Allows user to update password                                  |

Example of Creating User Account in JSON (Usernames must be unique!): 
```json
{
  "password": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "special_needs": true
}
```

Example output:
```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 0,
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "special_needs": true,
    "phone_number": "string",
    "address": "string"
  }
}
```

Example of Updating a User Account in JSON:
``` json
{
  "first_name": "string",
  "last_name": "string",
  "phone_number": "string",
  "address": "string",
  "special_needs": true
}
```

Example Output:
```json
{
  "id": 0,
  "email": "string",
  "hashed_password": "string",
  "first_name": "string",
  "last_name": "string",
  "special_needs": true,
  "phone_number": "string",
  "address": "string"
}
```

</br>
</br>

***Reviews RESTful API endpoints***

| Request Method  | Url                   | What it does                              |
| ----------------|:---------------------:| :----------------------------------------:|
| GET             | /api/reviews/         | Obtains a list of models                  |
| POST            | /api/reviews/         | Creates a new model                       |
| GET             | /api/reviews/mine     | Obtains model details                     |

Example of Create Review in JSON (Reviews are unique to the logged in Rider):
```json
{
  "date_time": "2024-03-22T12:51:33.539Z",
  "rating": 0,
  "description": "string",
  "ride_id": 0
}
```

Example output:
```json
{
  "id": 0,
  "date_time": "2024-03-22T12:51:33.540Z",
  "rating": 0,
  "description": "string",
  "ride_id": 0,
  "rider_id": 0,
  "pick_up_location": "string",
  "drop_off_location": "string"
}
```
Example Output of Getting Reviews for Drivers (reviews/mine) in JSON:
```json
[
  {
    "id": 0,
    "date_time": "2024-03-22T12:56:45.286Z",
    "rating": 0,
    "description": "string",
    "ride_id": 0,
    "rider_id": 0,
    "pick_up_location": "string",
    "drop_off_location": "string"
  }
]
```

</br>
</br>

***Rides RESTful API endpoints***

| Request Method  | Url                            | What it does                                                 |
| ----------------|:------------------------------:| :-----------------------------------------------------------:|
| GET             | /api/rides/                    | Obtains a list of all ride requests                          |
| POST            | /api/rides/                    | Creates a new ride request                                   | 
| GET             | /api/rides/{ride_id}           | Obtains a specific ride request                              |
| GET             | /api/rides/others              | Obtains a list of ride requests when logged in               |
| GET             | /api/rides/mine                | Obtains a list of logged in rider's requests                 |
| GET             | /api/rides/driver              | Obtains a list of logged in driver's completed rides history |
| PUT             | /api/rides/{ride_id}           | Allows drivers to accept ride requests                       |
| DELETE          | /api/rides/{ride_id}           | Deletes a ride request                                       |
| PUT             | /api/rides/{ride_id}/reject    | Allows driver's to decline a request                         |

Example of creating a ride request in JSON:
```json
{
  "date_time": "2024-03-22T13:56:40.005Z",
  "pick_up_location": "string",
  "drop_off_location": "string",
  "map_url": "string",
  "instructions": "string"
}
```

example output:
```json
{
  "id": 0,
  "date_time": "2024-03-22T13:56:40.005Z",
  "pick_up_location": "string",
  "drop_off_location": "string",
  "map_url": "string",
  "instructions": "string",
  "rider_id": 0,
  "driver_id": 0
}
```

</br>
</br>

***Rides RESTful API endpoints***

| Request Method  | Url                            | What it does                                                 |
| ----------------|:------------------------------:| :-----------------------------------------------------------:|
| GET             | /api/tickets/                  | Obtains a list of all help tickets                           |
| POST            | /api/tickets/                  | Creates a help ticket                                        | 


Example of creating a help ticket in JSON:
```json
{
  "description": "string",
  "user_id": 0,
  "ride_id": 0,
  "date_time": "2024-03-22T14:11:44.651Z"
}
```

example output:
```json
{
  "id": 0,
  "description": "string",
  "user_id": 0,
  "ride_id": 0,
  "date_time": "2024-03-22T14:11:44.651Z"
}
```

</br>
</br>

