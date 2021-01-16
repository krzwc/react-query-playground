# Config

In `backend` folder add `.env` file with contents:

```
PORT=4000
DATABASE_URL=mongodb://root:example@0.0.0.0:27017
```

In `frontend` folder add `.env` file with contents:

```
REACT_APP_ENDPOINT=http://localhost:4000/api/
```

# Building

`docker-compose up --build`

## 2DO:
