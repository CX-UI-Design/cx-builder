import axios from 'axios';

console.log('当前运行环境：');
console.log(process.env);
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'appId': '07d8737811434732',
    "appClientType": "pc",
  }
});

service.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  // response => response,
  response => {
    const resData = response.data;
    if (resData && (resData.resultCode === "200" || resData.resultCode === 200)) {
      return Promise.resolve(resData);
    }
    else {
      return Promise.reject(resData);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
