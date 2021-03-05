FROM node:14-alpine
RUN mkdir -p /app
WORKDIR /app
COPY ./packages/backend/package.json ./
COPY ./packages/backend/yarn.lock ./
RUN yarn install
COPY ./packages/backend .
CMD [ "yarn", "start" ]