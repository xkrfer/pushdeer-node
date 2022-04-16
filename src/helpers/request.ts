import axios from 'axios';

// 创建一个axios实例
const service = axios.create({
  timeout: 60000, // 超时时间
});

service.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const request = service;
