FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm ci -qy
COPY ./frontend .
CMD [ "npm", "run", "start" ]