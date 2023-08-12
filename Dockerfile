FROM node:18

WORKDIR /usr/src/app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]
