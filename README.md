# Hero Cab Project README

Team:

- [**Aaron Greenberg**] (https://gitlab.com/agreen.1c4) - Full Stack Engineer
- [**Austin Hall**] - (https://gitlab.com/npcsloan) - Full Stack Engineer
- [**Clement Lee**] (https://gitlab.com/clementlhc) - Full Stack Engineer
- [**Justin Nichols**] (https://gitlab.com/Jnich145) - Full Stack Engineer

## Overview
The Hero Cab project is designed using a monolithic architecture. For this project, we have created a ride-share/ carpool service for America's disabled veteran population. Our application allows users to request rides to VA appointments and for drivers to accept rides to take the requester (Disabled veteran). This README outlines the models, queries, routers, and URL's used on a FastAPI backend to integrate with the lists and forms created on a React frontend to render Single Page Applications. We use PostgreSQL for CRUD operations.  

## Instructions
*Getting Started:*
    **Make sure you have Docker, Git, Visual Studio Code and Node.js 18.2 or above**    
    1. Fork and clone the project repository from [GitLab Repository](https://gitlab.com/hero-cab/hero-cab/).
   
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

## Hero Cab Documents and Images
- [API Design](docs/api_documentation.md)
- [DDD Wireframe](docs/images/DDD_Wireframe.png)
- [Database Design](docs/images/Database_Design.png)

