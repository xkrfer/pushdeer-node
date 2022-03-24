const {
  DB_HOST = '127.0.0.1',
  DB_DATABASE = 'pushdeer',
  DB_PORT = 3306,
  DB_USERNAME = 'root',
  DB_PASSWORD = 'theVeryp@ssw0rd',
  REDIS_PORT = 6379,
  REDIS_HOST = '127.0.0.1',
  GO_RUSH_ADDRESS = '127.0.0.1',
  GO_PUSH_IOS_CLIP_TOPIC = 'com.pushdeer.self.ios.Clip',
  GO_PUSH_IOS_TOPIC = 'com.pushdeer.self.ios',
  GO_PUSH_IOS_PORT = 8888,
  GO_PUSH_IOS_CLIP_PORT = 8889,
  APP_DEBUG = false,
} = process.env;

const HTTP_PORT = 8800;

export {
  DB_HOST,
  DB_DATABASE,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  HTTP_PORT,
  REDIS_PORT,
  REDIS_HOST,
  GO_RUSH_ADDRESS,
  GO_PUSH_IOS_CLIP_TOPIC,
  GO_PUSH_IOS_TOPIC,
  GO_PUSH_IOS_PORT,
  GO_PUSH_IOS_CLIP_PORT,
  APP_DEBUG,
};
