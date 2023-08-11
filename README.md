# pickles-in-a-jar

An fire and forget email service that is written in NodeJS

## Requirements

- Docker and Docker Compose

## Getting Started

1. Copy and rename the **.env.example** file to **.env** which is located in the **base folder**.
2. Run these docker commands to spin up the service.
   ```bash
   docker compose up client server worker
   ```
3. Navigate to http://localhost:3000 on your browser.
4. Login with one of these credentials.
   ```
   username: user1
   password: secret1

   username: user2
   password: secret2
   ```
5. Stop the service by pressing Ctrl+C and run this command to bring down the service.
   ```bash
   docker compose down
   ```

## Developement Environment

### Packages

### Useful Commands

Building docker images
```bash
docker compose build
```

Running the service
```bash
# Normal mode
docker compose up client server worker
# Safe modes
docker compose up -d safe_mode
```

Tunneling into the service
```bash
# Normal mode
docker compose exec client sh
docker compose exec server sh
docker compose exec worker sh
# Safe mode
docker compose exec safe_mode sh
```

Stopping the service
```bash
docker compose stop
```

Destroying the service
```bash
docker compose down
# Additionally if you want to clear the db volume run this command as well
docker volume rm pickles-in-a-jar_postgres_volume
docker volume rm pickles-in-a-jar_redis_volume
```

## FAQ

1. How do I reset all the services to its initial state?
```bash
docker compose down
docker volume rm pickles-in-a-jar_postgres_volume
docker volume rm pickles-in-a-jar_redis_volume
```