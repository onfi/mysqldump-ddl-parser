FROM node:18.6.0
WORKDIR /var/app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .