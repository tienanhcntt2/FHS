FROM node:stretch-slim 

## Install http-server
RUN npm install -g superstatic

WORKDIR /app
COPY /dist/fhs .

# EXPOSE $PORT
ENTRYPOINT superstatic --host 0.0.0.0 --port 80 --gzip $USE_GZIP --debug $LOG_REQUESTS
# CMD ["superstatic" ,"--port 80"]