# Part 1 Finishing Core Features (Backend / API)
- ensure every endpoint I want is implemented: player stats, match stats, account stats, etc
- verify schedulers and workers handle all jobs correctly (no missing or failing jobs)
- add proper error handling and logging
- dont do any of this with AI anymore

- test API
- test Redis caching and BullMQ job processing under loads

- refactor and cleanup
- remove unnecessary console.logs
- ensure .env variables are clean and organized?

# Part 2. Dockerize the project
- make a backend container, redis container (optinoal), and postgres container (optional) 
- research this more later

- create a Dockerfile for Node + Express + BullMQ + Postgres
- include .env using '--env-file .env'

# Part 3. Local Integration Testing
- run docker-compose up with all services
- ensure backend can connect to Redis and Postgres inside Docker network
- test BullMQ workers and schedulers

# Part 4. Cloud Deployment
- deploy backend to AWS
- EC2: copy Docker image or Dockerfile and run container on EC2 instance

- deploy Redis
- either locally inside backend
- or AWS ElastiCache and update .env variable

- deploy Postgres to RDS

- deploy frontend

# Part 5. Performance Metrics
- benchmark endpoints with / without Redis caching
- measure response time, throughput, and CPU / memory usages
- record improvements