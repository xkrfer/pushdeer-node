FROM golang AS gorush

WORKDIR /

RUN git clone https://github.com/appleboy/gorush.git --depth=1  \
    && go env -w GO111MODULE=on \
    && go env -w GOPROXY=https://goproxy.cn,direct \
    && cd gorush \
    && go install \
    && go build -o ./bin/gorush

FROM node:14.17.6 AS build

WORKDIR /app

COPY package.json .

RUN npm install --registry=https://registry.npmmirror.com

COPY . .

RUN npm run build

FROM node:14.17.6-alpine AS release

LABEL maintainer="xkrfer <xkrfer@gmail.com>"

WORKDIR /release

COPY docker  .

COPY --from=gorush /gorush/bin/gorush push/gorush

COPY package.json .

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.14/main/" > /etc/apk/repositories \
        && apk update \
        && apk upgrade \
        && apk add --no-cache bash bash-doc bash-completion \
        && apk add --no-cache tzdata openrc libc6-compat\
        && apk add --no-cache redis \
        && mv redis.conf /usr/local/redis/redis.conf\
        && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
        && npm config set registry https://registry.npmmirror.com \
        && npm install -g pm2 \
        && npm install --production \
        && chmod +x ./push/gorush \
        && chmod +x start.sh \
        && rm -rf /var/cache/apk/*

COPY --from=build /app/dist dist

COPY static static

EXPOSE 8800

ENTRYPOINT ["/bin/sh", "start.sh"]

