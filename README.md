# Hero Cab Project README

Team:

- [**Aaron Greenberg**](https://gitlab.com/agreen.1c4) - Full Stack Engineer
- [**Austin Hall**](https://gitlab.com/npcsloan) - Full Stack Engineer
- [**Clement Lee**](https://gitlab.com/clementlhc) - Full Stack Engineer
- [**Justin Nichols**](https://gitlab.com/Jnich145) - Full Stack Engineer

## Intended Market

The Hero Cab project aims to address the transportation needs of America's disabled veteran population. Disabled veterans often face challenges in accessing reliable transportation to their VA appointments. This project provides a ride-share/carpool service specifically tailored to meet their needs.

Additionally, the project also caters to volunteers who are willing to help disabled veterans by providing transportation services. Volunteers can sign up as drivers and accept ride requests from disabled veterans, ensuring that they can attend their appointments without any transportation barriers.

By connecting disabled veterans with volunteers, the Hero Cab project not only improves the quality of life for disabled veterans but also fosters a sense of community and support among those who are willing to lend a helping hand.

The project's user-friendly interface, powered by React frontend and FastAPI backend, ensures a seamless experience for both disabled veterans and volunteers. With the integration of PostgreSQL for CRUD operations, the project offers a reliable and efficient platform for coordinating rides and facilitating communication between users.

Join us in making a difference in the lives of disabled veterans and creating a supportive community of volunteers through the Hero Cab project.

## Authorization and Safety
The Hero Cab project prioritizes the safety and security of its users through robust authorization measures. User authentication is implemented using industry-standard protocols, ensuring that only authorized individuals can access the platform. In the future, we will incorporate stringent safety features, such as driver background checks and vehicle inspections, to guarantee a secure and reliable transportation experience for disabled veterans. With a focus on user privacy and data protection, Hero Cab adheres to best practices in data encryption and storage. Rest assured, Hero Cab is committed to providing a trustworthy and secure platform for both disabled veterans and volunteers.

## Instructions
*Getting Started:*
    **Make sure you have Docker, Git, Visual Studio Code and Node.js 18.2 or above**    
    1. Fork and clone the project repository from the ***Hero Cab*** [GitLab Repository](https://gitlab.com/hero-cab/hero-cab/).

    2. Create a new image, volumes, and containers in the Docker Desktop App or CLI with the following commands:

   ``` 
    docker volume create postgres-data
    docker compose up -d
   ```
    
    - You'll be able to see the progress in either your CLI or the Docker Container Desktop App, but it can take some to complete depending on your system.

    - Once all the Docker containers are running (check the Docker app if you're unsure), you can view the empty React project in your browser @ http://localhost:5173/. Voila!
  </br>

## Design
Hero Cab uses :
 - **React Frontend: Allows dynamic Single Page Applications**
 - **FastAPI Backend: Allows fast design and setup for backend API operations**
 - **PostreSQL: The most popular Database Manager for easy implementation into FastAPI**

- [API Design](docs/api_documentation.md)
- [MVP Wireframe](docs/images/DDD_Wireframe.png)
- [Database Design](docs/images/Database_Design.png)

## Unit Testing

Unit testing is an essential part of the Hero Cab project to ensure the reliability and correctness of the codebase. We use the following tools and frameworks for unit testing:

- **Pytest**: A popular testing framework for Python that allows us to write simple and scalable tests.


Our unit tests cover various aspects of the application, including API endpoints, database operations, and React component rendering. By writing comprehensive unit tests, we can catch bugs early in the development process and maintain the stability of the application.

The Hero Cab project includes unit tests to ensure the reliability and correctness of the codebase. These tests cover various aspects of the application, including creating rides, getting rides, creating users, getting users, creating reviews, and getting reviews.

For creating rides, former USAF TACP [**Aaron Greenberg**](https://gitlab.com/agreen.1c4) ensured the unit tests would verify that the ride creation endpoint correctly handles the input data and stores the ride information in the database. It would also check that the appropriate response is returned to the user.

Similarly, for getting rides, former US Army SOT-A Linguist [**Justin Nichols**](https://gitlab.com/Jnich145) ensured unit tests would validate that the endpoint retrieves the correct ride information from the database and returns it to the user.

Former USAF Linguist [**Austin Hall**](https://gitlab.com/npcsloan)'s unit tests for creating users would ensure that the user creation endpoint properly handles the user data and stores it in the database. It would also verify that the necessary validations and error handling are in place.

When it comes to getting users, Senior Manager [**Clement Lee**](https://gitlab.com/clementlhc), SHRM-SCP, ensured the unit tests would validate that the endpoint retrieves the correct user information from the database and returns it to the user.

For creating reviews, Senior Manager [**Clement Lee**](https://gitlab.com/clementlhc), SHRM-SCP,former US Army SOT-A Linguist [**Justin Nichols**](https://gitlab.com/Jnich145), and Former USAF Linguist [**Austin Hall**](https://gitlab.com/npcsloan) ensured  the unit tests would verify that the review creation endpoint correctly handles the input data and stores the review information in the database. It would also check that the appropriate response is returned to the user.

Lastly, for getting reviews, the unit tests would ensure that the endpoint retrieves the correct review information from the database and returns it to the user, by **Team Hero Cab**.

By writing comprehensive unit tests for these functionalities, the Hero Cab project can maintain the stability of the application and catch any potential bugs early in the development process.



To run the unit tests, follow these steps:

1. Make sure you have all the project dependencies installed.
2. Open the API exec terminal in Docker.
3. Run the following command to execute the tests:
    ``` python -m pytest ```
