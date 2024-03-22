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

</br>
</br>

***Automobile RESTful API endpoints***

| Request Method  | Url                     | What it does                              |
| ----------------|:-----------------------:| :----------------------------------------:|
| GET             | /api/automobiles/       | Obtains a list of automobiles.            |
| POST            | /api/automobiles/       | Creates an automobile                     |
| GET             | /api/automobiles/vin#/  | Obtains automobile details                |
| PUT             | /api/automobiles/vin#/  | Updates an automobile                     |
| DELETE          | /api/automobiles/vin#/  | Deletes an automobile                     |

example JSON
```json
{
  "color": "silver",
  "year": 2024,
  "vin": "1HGBH41JXMN109",
  "model_id": 1
}
```

example output
```json
{
"href": "/api/automobiles/1HGBH41JXMN1091/",
"id": 1,
"color": "Black",
"year": 2024,
"vin": "1HGBH41JXMN1091",
"model": {
	"href": "/api/models/1/",
	"id": 1,
	"name": "Silverado",
	"picture_url": "https://s3-prod.autonews.com/s3fs-public/silverado-HD.jpg",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Chevrolet"
	}
},
"sold": false
}
```

</br>
</br>



## Service microservice
The service microservice uses a value object and a **poller** function to keep the Automobile Value object updated with real-time information from inventory.     
1. AutomobileVO

    - Requires a vin and sold status

2. Technician Model

    - Requires a first name, last name, and employee id
    - 
3. Appointment

    - Requires a vin, customer name, technician (foreign key is used here), date/time, reason, and status (pending by default, can be changed to 'cancelled' or 'finished')

Service Port: http://localhost:8080/

***Technician RESTful API endpoints***

| Request Method  | Url                     | What it does                              |
| ----------------|:-----------------------:| :----------------------------------------:|
| GET             | /api/technicians/       | Gets a list of technicians                |
| POST            | /api/technicians/       | Creates a new technician                  |
| GET             | /api/technicians/id#    | Obtain technician details                 |
| PUT             | /api/technicians/id#    | Updates a technician                      |
| DELETE          | /api/technicians/id#    | Deletes a technician                      |

Example of List Technician in JSON (Manufacturer names must be unique!)
```json
{
	"technicians": [
		{
			"first_name": "Aaron",
			"last_name": "Greenberg",
			"employee_id": 1
		},
		{
			"first_name": "Nick",
			"last_name": "Cline",
			"employee_id": 2
		}
  ]
}
```

Example Technician Detail output
```json
{
	"first_name": "Aaron",
	"last_name": "Greenberg",
	"employee_id": 1
}
```


Example of Create Technician in JSON (Can also be used to update technician!)
```json
{
	"first_name": "Thome",
	"last_name": "Yorke",
	"employee_id": 8
}
```

Example output
```json
{
	"first_name": "Thome",
	"last_name": "Yorke",
	"employee_id": 8
}
```

</br>
</br>

***Vehicle Model RESTful API endpoints***

| Request Method  | Url                     | What it does                              |
| ----------------|:-----------------------:| :----------------------------------------:|
| GET             | /api/appointments/      | Obtains a list of appointment             |
| POST            | /api/appointments/      | Creates a new appointment                 |
| GET             | /api/appointments/id#   | Obtains appointment details               |
| PUT             | /api/appointments/id#   | Updates an appointment                    |
| DELETE          | /api/appointments/id#   | Deletes an appointment                    |

Example of List Appointment in JSON
```json
{
"href": "/api/appointments/2/",
"vin": "1HGBH41JXMN1091",
"customer": "Jason Statham",
"date_time": "2024-02-08T19:26:06+00:00",
"reason": "needs more boost 'guvnor",
"status": "finished",
"vip": true,
"technician": {
"first_name": "Aaron",
"last_name": "Greenberg",
"employee_id": 1
}
```

Example of appointment detail output
```json
{
"href": "/api/appointments/2/",
"vin": "1HGBH41JXMN1091",
"customer": "Jason Statham",
"date_time": "2024-02-08T19:26:06+00:00",
"reason": "needs more boost 'guvnor",
"status": "finished",
"vip": true,
"technician": {
"first_name": "Aaron",
"last_name": "Greenberg",
"employee_id": 1
}
}
```

Example of Create Appointment in JSON
```json
{			
	
	"vin": "1HGBH41JXMN1091",
	"customer": "Jason Statham",
	"date_time": "2024-02-08T19:26:06+00:00",
	"reason": "needs more boost 'guvnor",
	"technician": 1
	
	
}
```

Example output
```json
{
"href": "/api/appointments/2/",
"vin": "1HGBH41JXMN1091",
"customer": "Jason Statham",
"date_time": "2024-02-08T19:26:06+00:00",
"reason": "needs more boost 'guvnor",
"status": "finished",
"vip": true,
"technician": {
"first_name": "Aaron",
"last_name": "Greenberg",
"employee_id": 1
}
}
```

</br>
</br>

## Sales microservice

The sales Mircoservice has 4 models: AutomobileVO, Customer, Salesperson, and Sale. Sale is the model that interacts with the other three models. This model polls data from Salesperson, Customer, and AutomobileVO. There is some issues with it still. I had errors populated on the front end revealing the hidden truth.

## Endpoints to send and view data - Access through Insomnia:

### Customers:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET | http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
| Show a specific customer | GET | http://localhost:8090/api/customers/id/

To create a Customer (SEND THIS JSON BODY):
```
{
	"name": "Jay wilson",
	"address": "1738 Pimp Street",
	"phone_number": 3056798765
}
```

Return Value of Creating a Customer:
```
{
	"id: "1",
	"name": "John wayne",
	"address": "1212 Oceans twelve",
	"phone_number": 9112345676
}
```
Return value of Listing all Customers:
```
	"customers": 
```
{
	"name": "Jay wilson",
	"address": "1738 Pimp Street",
	"phone_number": 3056798765
},{
			"id: "1",
	"name": "John wayne",
	"address": "1212 Oceans twelve",
	"phone_number": 9112345676}
```
### Salespeople:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/id/


To create a salesperson (SEND THIS JSON BODY):
```
{
	"name": "Warren Longmire",
	"employee_number": 1
}
```
Return Value of creating a salesperson:
```
{
	"id": 1,
	"name": "Warren Longmire",
	"employee_number": 1
}
```
List all salespeople Return Value:
```
{
	"salespeople": [
		{
			"id": 1,
			"name": "Warren Longmire",
			"employee_number": 1
		}
	]
}
```
### Salesrecords:
- the id value to show a salesperson's salesrecord is the **"id" value tied to a salesperson.**

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all sales | GET | http://localhost:8090/api/sales/
| Create a new sale | POST | http://localhost:8090/api/sales/
| Show salesperson's sales | GET | http://localhost:8090/api/sales/id/
List all Sales Return Value:
```
{
	"sales": [
		{
			"id": 1,
			"price": 111000,
			"vin": {
				"vin": "111"
			},
			"salesperson": {
				"id": 1,
				"name": "Liz",
				"employee_number": 1
			},
			"customer": {
				"name": "John Wayne",
				"address": "1212 Oceans Twelve Street",
				"phone_number": "980720890"
			}
		}
	]
}
```
Create a New Sale (SEND THIS JSON BODY):
```
{
	"salesperson": "Warren",
	"customer": "John wayne",
	"vin": "767",
	"price": .50
}
```
Return Value of Creating a New Sale:
```
{
	"id": 4,
	"price": .50,
	"vin": {
		"vin": "767"
	},
	"salesperson": {
		"id": 1,
		"name": "Warren",
		"employee_number": 1
	},
	"customer": {
		"id",
		"name": "John Wayne",
		"address": "1212 Oceans Twelve Street",
		"phone_number": "9804357878"
	}
}
```
Show a Salesperson's Sales Return Value:
```
{
	"id": 1,
	"price": .50,
	"vin": {
		"vin": "767"
	},
	"salesperson": {
		"id": 1,
		"name": "Warren",
		"employee_number": 1
	},
	"customer": {
		"id",
		"name": "John Wayne",
		"address": "1212 Oceans Twelve Street",
		"phone_number": "980720890"
	}
}
```