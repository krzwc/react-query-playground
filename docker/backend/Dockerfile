FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm ci -qy
COPY ./backend .
CMD [ "npm", "run", "start" ]