<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

## Description
Basic event registration API using Nest.Js, Postgres, and Docker.

## Running the app
The application can be run in a Docker environment. To do this, make sure you have Docker and Docker Compose installed and configured on your machine.
After that, follow the steps below:

Edit the 'typeorm.config.ts' file on 'src/configs/' and add your db username and password:

```js
export const typeOrmConfig: TypeOrmModuleOptions = {
    "type": "postgres",
    "host": "pgsql",
    "port": 5432,
    "username": "your-db-username",
    "password": "your-db-password",
    "database": "postgres",
    "synchronize": true,
    "entities": ["dist/**/*.entity{.ts,.js}"]
};
```
Edit the 'docker-compose.yml' file and add your db username and password:

```yml
version: '3'

services:
  api:
    build:
      context: .
      dockerfile: ./Dockerfile
    ports:
      - '3000:3000'
    container_name: nest-calendar-api
    restart: always

  pgsql:
    image: postgres:alpine
    ports:
      - '5432:5432'
    container_name: 'pgsql'
    restart: always
    volumes:
      - pg-data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: "your-db-username"
      POSTGRES_PASSWORD: "your-db-password"
      POSTGRES_DB: postgres

volumes:
  pg-data:
```
After that, run the following command in the project root:

```bash
docker-compose up -d
```
The Docker Compose will configure and start a container for Postgres and the Api

## Using the api
With the docker container running, you can make requests to baseURL:
```bash
http://localhost:3000/event
```
Below are the routes available in the application and examples of how to make requests

```sh
POST /create-event (Create a new event)
Body of Request:
{
    "event_title": "test",
    "event_date": "2022-02-25",
    "start_event_hour": "08:00:00",
    "end_event_hour": "09:00:00"
}

Response Example:
{
    "event_title": "test",
    "event_date": "2022-02-25",
    "start_event_hour": "08:00:00",
    "end_event_hour": "09:00:00"
    "id": 1
}
```

```sh
GET /list-all (List all registered events)
Response Example:
[
    {
        "id": 2,
        "event_title": "test",
        "event_date": "2022-02-25",
        "start_event_hour": "21:49:59",
        "end_event_hour": "23:59:59"
    }
]
```

```sh
GET /list-event/:id (List an event by id)
Response Example:
{
    "id": 4,
    "event_title": "test",
    "event_date": "2022-02-25",
    "start_event_hour": "08:00:00",
    "end_event_hour": "09:00:00"
}
```

```sh
PUT /update-event/:id (Update an event by id)
Body of Request:
{
    "event_title": "test",
    "event_date": "2022-02-26",
    "start_event_hour": "08:00:00",
    "end_event_hour": "09:00:00"
}

Response Example:
{
    "id": 4,
    "event_title": "test",
    "event_date": "2022-02-26",
    "start_event_hour": "08:00:00",
    "end_event_hour": "09:00:00"
}
```

```sh
DELETE /delete-event/:id (Delete an event by id)
Response Example:
{
    "message": "Event deleted successfully!"
}
```


