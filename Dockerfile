FROM node:16.17.1

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3333

CMD [ "npm", "start" ]
