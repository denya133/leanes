FROM node:14.9.0-buster

LABEL maintainer="Denis Trayzhon <d.g.trayzhon@gmail.com>"

RUN mkdir -p /usr/src/leanes
WORKDIR /usr/src/leanes
COPY package*.json ./
RUN npm install

WORKDIR /

ADD start.sh start.sh

RUN chmod -R u+x start.sh

WORKDIR /usr/src/leanes
COPY . .

CMD bash start.sh
