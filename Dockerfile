FROM node:18

WORKDIR /usr/src/app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 8080

CMD [ "node", "build/src/index.js" ]
