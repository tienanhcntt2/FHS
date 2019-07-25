FROM node:latest 

## Install http-server
RUN npm install http-server -g
WORKDIR /app
COPY . .

CMD ["http-server","-p 80"]


# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/fhs /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf