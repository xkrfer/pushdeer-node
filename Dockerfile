FROM golang AS gorush

WORKDIR /push

RUN git clone https://github.com/appleboy/gorush.git --depth=1 \
    && cd gorush \
    && go install \
    && go build -o ../bin/gorush

FROM node:16.4.2 AS build

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build

FROM node:16.4.2-alpine AS release

LABEL maintainer="xkrfer <xkrfer@gmail.com>"

WORKDIR /release

COPY docker  /release/

COPY --from=gorush /push/bin/gorush /release/push/gorush

COPY package.json /release/

RUN npm install --production \
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
