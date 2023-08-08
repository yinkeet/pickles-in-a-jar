FROM node:18-alpine

RUN apk update && apk upgrade
RUN apk add --update tzdata

WORKDIR /app

# Copy shell script
COPY scripts/ /usr/local/bin/
RUN chmod +x /usr/local/bin/run