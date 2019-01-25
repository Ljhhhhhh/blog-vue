import axios from 'axios';

const service = axios.create({
  baseURL: 'http://127.0.0.1:1234', // api 的 base_url
  timeout: 5000,
});
// const SECRECT = '1234567890'; // y8q6wjtz3j1emtbwqnhipjgkpynpvmhh
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
