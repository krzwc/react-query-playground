# Building via docker-compose

1. Prior to the next step please make sure you have `Docker` and `Docker Compose` installed on your local machine (checked on `Docker version 19.03.5, build 633a0ea` and `docker-compose version 1.25.4, build 8d51620a`).

2. Uncomment lines 14-51 in `docker-compose.yml` and in the root folder run:

```sh
docker-compose up --build
```

The UI will be available at `http://localhost:3000`

# Building all microservices independently

1. Prior to the next steps please make sure you have `Docker`, `Docker Compose`, `Node` installed on your local machine (checked on `node v14.7.0` and `Docker` + `Docker Compose` as ☝️).
   To build a container with DB in the root folder run:

```sh
docker-compose up --build
```

2. In `backend` folder add `.env` file with contents:

```sh
PORT=4000
DATABASE_URL=mongodb://root:example@0.0.0.0:27017
```

and run

```sh
npm ci
npm run start
```

The BE service will be served from `http://localhost:4000`

3. In `frontend` folder run:

```sh
npm ci
npm run start
```

The FE service will be served from `http://localhost:3000`

# Running tests

I added merely a few sanity integration/e2e tests to make sure the UI works as expected. To run them execute:

```sh
npm run test
```

and with DB and BE running

```sh
npm run cypress:start
```

in the `frontend` folder.
