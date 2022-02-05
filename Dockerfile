# Stage 1
FROM node:16-alpine as build-step
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2

FROM nginx:latest

COPY --from=build-step /app/dist/rotgrind-bingo /usr/share/nginx/html