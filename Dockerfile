FROM node:14.17.6 AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:14.17.6-alpine AS release

LABEL maintainer="xkrfer <xkrfer@gmail.com>"

WORKDIR /release

COPY docker  .

COPY package.json .

RUN npm install --production \
    && npm install -g pm2 \
    && apk update \
    && apk upgrade \
    && apk add --no-cache bash bash-doc bash-completion \
    && apk add --no-cache tzdata openrc libc6-compat\
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && sed  -i 's/localhost/redis/g' /release/push/ios.yml \
    && sed  -i 's/localhost/redis/g' /release/push/clip.yml \
    && wget https://github.com/appleboy/gorush/releases/download/v1.15.0/gorush-v1.15.0-linux-amd64 \
    && mv gorush-v1.15.0-linux-amd64 /release/push/gorush \
    && chmod +x /release/push/gorush \
    && chmod +x start.sh \
    && rm -rf /var/cache/apk/*

COPY --from=build /app/dist dist

COPY static static

EXPOSE 8800

ENTRYPOINT ["/bin/sh", "start.sh"]

