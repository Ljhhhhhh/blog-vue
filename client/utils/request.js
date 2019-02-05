import axios from 'axios';
const config = require('../config.js')

const service = axios.create({
  baseURL: config.baseUrl, // api 的 base_url ’http://http://blog_api.cixi518.com:1234‘
  timeout: 5000,
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something
    return config;
  },
  (error) => {
    // Do something with request error
    // console.log(error); // for debug
    Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  // response => response.data,
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    // console.log(`err${error}`); // for debug
    return Promise.reject(error);
  },
);

export default service;
