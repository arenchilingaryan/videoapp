FROM node:18

WORKDIR /usr/src/app

ENV NODE_ENV=production

RUN npm cache clean --force

COPY package*.json ./

RUN npm install ts-node --save-dev

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]
