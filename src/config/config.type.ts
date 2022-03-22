export interface DbConfig {
  type: string;
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
  timezone: string;
}

export interface RedisConfig {
  port: number;
  host: string;
}

export interface HttpConfig {
  port: number;
  host: string;
}

export interface ConfigInterface {
  db: DbConfig;
  redis: RedisConfig;
  http: HttpConfig;
}

