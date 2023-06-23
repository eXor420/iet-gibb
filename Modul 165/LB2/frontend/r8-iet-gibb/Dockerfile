FROM node:18-alpine as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/
COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install --force
RUN npm run build --prod

# Serve Application using Nginx Server

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/r8-iet-gibb/ /usr/share/nginx/html

EXPOSE 80
