
FROM node:stretch-slim 

## Install http-server
RUN npm install http-server -g
WORKDIR /app
COPY /dist/fhs .

CMD ["http-server","-p 80"]