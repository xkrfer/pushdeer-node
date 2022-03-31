pushdeer-node 是 [pushdeer](https://github.com/easychen/pushdeer) 的Node实现版本，采用 [nestjs](https://github.com/nestjs/nest)
开发 。

### 起因

在 [easychen](https://github.com/easychen)
的微博中知道了这个项目，了解了一下觉得非常有意思，只要实现了相关api就能够使用pushdeer的自架版客户端。正好这段时间在看 [nestjs](https://github.com/nestjs/nest) ，于是就
以移植 [pushdeer](https://github.com/easychen/pushdeer) 为目的使用 [nestjs](https://github.com/nestjs/nest) 进行开发。

### 说明

该项目参考了 [pushdeer](https://github.com/easychen/pushdeer) 的大量写法，包括但不限于API、 Dockerfile、docker-compose.yml等

### 特性

- 实现 [pushdeer](https://github.com/easychen/pushdeer) 的大部分API
- 仅支持iOS自架版客户端以及对应的轻应用，配合 [使用自架服务器端和自架版客户端](https://github.com/easychen/pushdeer#%E4%BD%BF%E7%94%A8%E8%87%AA%E6%9E%B6%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E5%92%8C%E8%87%AA%E6%9E%B6%E7%89%88%E5%AE%A2%E6%88%B7%E7%AB%AF)
食用更佳

### 运行方式

#### 环境变量

| 变量                             | 默认值           | 说明                                |
|--------------------------------|---------------|-----------------------------------|
| DB_TYPE                        | mariadb       | 数据库类型，可选值mariadb、mysql            |
| DB_HOST                        | 127.0.0.1     | 数据库地址，支持mariadb 10.5.8+ 、mysql 8+ |
| DB_DATABASE                    | pushdeer      | 数据库                               |
| DB_USERNAME                    | root          | 数据库用户名                            |
| DB_PORT                        | 3306          | 数据库端口                             |
| DB_PASSWORD                    | theVeryp@ssw0rd | 数据库密码                             |
| REDIS_PORT                     | 6379          | redis端口号                          |
| REDIS_HOST                     | 127.0.0.1（开发时） | redis地址                           |
| APP_DEBUG                      | false         | 是否开启debug模式，开启时终端会打印相关请求          |
| MAX_PUSH_EVERY_USER_PER_MINUTE | 120           | 每个ip下每分钟发送消息的最大次数是                |
| MAX_PUSH_KEY_PER_TIME          | 100           | 批量发消息时最大pushkey数量                 |
| MAX_EVERY_API_LIMIT_PER_MINUTE | 60            | 每个ip下每分钟调用接口的最大次数（发送消息接口除外）       |

#### 使用目录下docker-compose配置文件

```bash

git clone https://github.com/xkrfer/pushdeer-node --depth=1

docker-compose -f <docker-compose配置文件> up --build -d

# 运行成功后 访问 http://ip:8800 可以确认是否搭建成功

```

- docker-compose.yml
    - 数据库为docker环境，适合对数据留存不敏感用户使用。
- docker-compose.mysql.yml
    - 需自行在文件中填入mysql或mariadb的相关信息，适合已有数据库服务的用户使用。

> 注意：使用源码构建的用户，因为在构建中需从外网拉取相关依赖，故构建机器需支持外网访问。

如果想省去源码构建这一步，可将docker-compose.yml中app部分改成如下即可

```diff
- build: '.'
+ image: 'xkrfer/pushdeer-node'
```

### 开发方式

#### 启动mariadb、redis

```bash
docker-compose -f docker-compose.dev.yml up  -d
```

#### 启动项目

```bash
git clone https://github.com/xkrfer/pushdeer-node

cd pushdeer-node

npm install

npm run start:dev

# 端口号8800

```

### 致谢

感谢 [pushdeer](https://github.com/easychen/pushdeer) 的相关开发人员，包括但不限于 [easychen](https://github.com/easychen)
、[Hext123](https://github.com/Hext123) 等。

本项目是 [pushdeer](https://github.com/easychen/pushdeer) Node练手版，上生产建议使用 [pushdeer](https://github.com/easychen/pushdeer) 。

### License

Copyright 2022 [xkrfer](https://github.com/xkrfer).

Licensed under the MIT License.

