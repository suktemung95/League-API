# How to run?

- Start a postgres instance through docker using the following command:
  docker run --name (docker instance name here) \
   -e POSTGRES_DB=(db name here) \
   -e POSTGRES_USER=(user name here) \
   -e POSTGRES_PASSWORD=(password here) \
   -p 5432:5432 \
   -v pgdata:/var/lib/postgresql/data \
   -d postgres

- i plan to automate this next part sometime
- using preferred database editor (i use pgadmin), make an accounts ()

- cd to /server and run 'npm run dev', server is now running
- use api calls through your preferred service, .rest file located in /server
