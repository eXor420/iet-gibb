FROM node:18-alpine as build
LABEL authors="exor420"

WORKDIR /usr/local/app
COPY package.json ./
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm i
COPY . .
RUN npm run build -- --configuration=development

FROM nginx:alpine
COPY --from=build /usr/local/app/dist/xserver/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
