FROM node:14-alpine
RUN mkdir -p /app
WORKDIR /app
COPY ./packages/frontend/package.json ./
COPY ./packages/frontend/yarn.lock ./
RUN yarn install
COPY ./packages/frontend .
CMD [ "yarn", "start" ]