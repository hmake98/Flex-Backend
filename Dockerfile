FROM node:12-alpine

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps alpine-sdk python

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build \
    && apk del .build-deps

EXPOSE 5000

CMD [ "npm",  "start" ]