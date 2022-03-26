FROM golang AS gorush

WORKDIR /push

RUN git clone https://github.com/appleboy/gorush.git --depth=1 \
    && go env -w GO111MODULE=on \
    && go env -w GOPROXY=https://goproxy.cn,direct \
    && cd gorush \
    && go install \
    && go build -o ../bin/gorush

FROM node:14.17.6 AS build

WORKDIR /app

COPY package.json /app/

RUN npm install --registry=https://registry.npmmirror.com

COPY . /app/

RUN npm run build

FROM node:14.17.6-alpine AS release

LABEL maintainer="xkrfer <xkrfer@gmail.com>"

WORKDIR /release

COPY docker  /release/

COPY --from=gorush /push/bin/gorush /release/push/gorush

COPY package.json /release/

RUN npm install --registry=https://registry.npmmirror.com --production \
    && echo "http://mirrors.ustc.edu.cn/alpine/v3.9/main/" > /etc/apk/repositories \
    && apk update \
    && apk upgrade \
    && apk add --no-cache bash bash-doc bash-completion \
    && apk add --no-cache tzdata openrc supervisor libc6-compat\
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && cp supervisord/supervisord.conf /etc/supervisord.conf \
    && chmod 777 /release/supervisord/start.sh \
    && chmod 777 /release/push/gorush \
    && rm -rf /var/cache/apk/*

COPY --from=build /app/dist /release/dist

ENTRYPOINT ["/bin/sh", "/release/supervisord/start.sh"]

EXPOSE 8800
