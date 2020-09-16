FROM node:12.18.2-alpine

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache make gcc g++ python && npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

CMD [ "npm", "start" ]