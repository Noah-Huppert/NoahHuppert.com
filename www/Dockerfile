# Build
FROM node:21-alpine3.18 AS build

RUN mkdir -p /opt/noahhuppert-com
WORKDIR /opt/noahhuppert-com

COPY ./ ./
RUN npm install
RUN npm run build

# Host
FROM nginx:1.25.4-alpine
COPY --from=build /opt/noahhuppert-com/dist/ /usr/share/nginx/html