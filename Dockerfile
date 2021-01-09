FROM node:14-alpine

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN apk add --no-cache g++ make pyth
RUN yarn install && yarn cache clean

COPY . /app

CMD ["yarn", "build"]
