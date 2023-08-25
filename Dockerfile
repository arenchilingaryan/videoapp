FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \
    && npm install ts-node --save-dev \
    && npm install -g ts-node \
    && npm cache clean --force

COPY . .

RUN npx tsc

FROM node:alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build ./dist
COPY package*.json ./

RUN npm install --only=production

EXPOSE 8080

CMD [ "node", "dist/src/index.js" ]