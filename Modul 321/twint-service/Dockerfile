FROM node:18-alpine
LABEL authors="exor420"

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install

COPY . .
ENV NODE_ENV=production
EXPOSE 3001
CMD [ "node", "server.js" ]