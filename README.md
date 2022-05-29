pushdeer-node 是 [pushdeer](https://github.com/easychen/pushdeer) 的Node实现版本，采用 [nestjs](https://github.com/nestjs/nest) 开发 。

## 起因

在 [easychen](https://github.com/easychen) 的微博中知道了这个项目，了解了一下觉得非常有意思，只要实现了相关api就能够使用pushdeer的自架版客户端。正好这段时间在看 [nestjs](https://github.com/nestjs/nest) ，于是就使用 [nestjs](https://github.com/nestjs/nest) 进行移植。

## 目录

   * [起因](#起因)
   * [目录](#目录)
      * [说明](#说明)
      * [特性](#特性)
      * [立即体验](#立即体验)
      * [运行方式](#运行方式)
         * [环境变量](#环境变量)
         * [使用目录下docker-compose配置文件](#使用目录下docker-compose配置文件)
      * [Railway 部署](#railway-部署)
      * [开发方式](#开发方式)
         * [启动mariadb、redis](#启动mariadbredis)
         * [启动项目](#启动项目)
      * [浏览器插件使用](#浏览器插件使用)
         * [准备](#准备)
         * [申请GitHub App](#申请github-app)
         * [申请推送API](#申请推送api)
         * [运行](#运行)
         * [注意事项](#注意事项)
   * [致谢](#致谢)
   * [License](#license)

### 说明

该项目参考了 [pushdeer](https://github.com/easychen/pushdeer) 的大量写法，包括但不限于API、 Dockerfile、docker-compose.yml等

### 特性

- 实现 [pushdeer](https://github.com/easychen/pushdeer) 的大部分API
- 仅支持iOS自架版客户端以及对应的轻应用，配合 [使用自架服务器端和自架版客户端](https://github.com/easychen/pushdeer#%E4%BD%BF%E7%94%A8%E8%87%AA%E6%9E%B6%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E5%92%8C%E8%87%AA%E6%9E%B6%E7%89%88%E5%AE%A2%E6%88%B7%E7%AB%AF)
食用更佳
- 在 Chrome / Edge 中可使用配套浏览器插件 [pushdeer-crx](https://github.com/xkrfer/pushdeer-crx)  进行消息收发

### 立即体验

将下方地址设置为endpoint即可体验！（下方地址仅供体验使用！长久使用建议自行部署！）

```url
https://pushdeer-node.vercel.app
```

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
| MAX_PUSH_KEY_PER_TIME          | 100           | 批量发消息时pushkey的最大数量      |
| MAX_EVERY_API_LIMIT_PER_MINUTE | 60            | 每个ip下每分钟调用接口的最大次数（发送消息接口除外）       |
| GITHUB_CLIENT_ID | - | GitHub 中申请的应用id（见下文申请） |
| GITHUB_CLIENT_SECRET | - | GitHub 中申请的应用密钥（见下文申请） |
| FCM_API_KEY | - | Google Cloud Platform API 密钥（见下文申请） |
| FCM_PUBLIC_KEY | - | Web 推送证书公钥（见下文申请） |
| FCM_PRIVATE_KEY | - | Web 推送证书私钥（见下文申请） |

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
+ image: 'xkrfer/pushdeer-node:latest'
```

### Railway 部署

没有服务器？试试一键Railway 部署！点击查看 [使用Railway部署教程](https://github.com/xkrfer/pushdeer-node/wiki/Railway部署pushdeer-node) 。

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/R7ETeQ?referralCode=_nO06Y)

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

# swagger 地址为 http://localhost:8800/swagger-ui

```

### 浏览器插件使用

#### 准备

- 科学上网的环境
- GitHub 账号
- Google 账号
- 假定我们是部署在某台内网的机器上，此机器的ip地址为 **A**

#### 申请GitHub App

1. 登录GitHub
2. 注册一个应用 [New OAuth Application ](https://github.com/settings/applications/new)  (路径为：**右上角个人头像** > **Settings** > **Developer settings** > **OAuth Apps** -> **New OAuth App**)，填入信息如下：
   1. Application name 应用名，可随意填写
   2. Homepage URL，我们假定部署后的地址为 http://{A}:8800
   3. Authorization callback URL，此处填写 http://{A}:8800/login/github
   4. 点击  **Register application**  ，创建成功后会进入应用详情页
   5. 此时我们可以看到 **Client ID** ，接下来我们点击 **Generate a new client secret** 生成 **Client Secrets**
   6. GitHub 生成完毕，此时我们记录创建后的 **Client ID**  以及 **Client Secrets**

#### 申请推送API

1. 打开 [firebase](https://console.firebase.google.com/)

2. 获取推送相关密钥见下图

    ![申请FCM](./apply-fcm.gif)



#### 运行

将上述申请的信息依次填入**docker-compose.yml**中并启动容器。

#### 注意事项

1. 由于GFW的存在，如果使用Chrome接受推送消息，必须将本程序部署在国外的服务器上或具有科学上网环境的服务器中
2. Edge可正常部署

## 致谢

感谢 [pushdeer](https://github.com/easychen/pushdeer) 的相关开发人员，包括但不限于 [easychen](https://github.com/easychen) 、[Hext123](https://github.com/Hext123) 等。

本项目是 [pushdeer](https://github.com/easychen/pushdeer) Node练手版，上生产建议使用 [pushdeer](https://github.com/easychen/pushdeer) 。

## License

Copyright 2022 [xkrfer](https://github.com/xkrfer).

Licensed under the MIT License.

