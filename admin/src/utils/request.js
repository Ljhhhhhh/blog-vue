import axios from 'axios';
// import md5 from 'md5-node';
// import store from '../store';
import cookie from 'js-cookie';
// import { Toast } from 'vant';
import { Message } from 'element-ui';
// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:1234', // api 的 base_url blog_api.cixi518.com
  timeout: 5000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers.token = cookie.get('token');
    config.headers.account = cookie.get('account');
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
    if (res.code === 402) {
      Message({
        message: res.msg,
        type: 'error'
      });
    }
    return res;
  },
  (error) => {
    // console.log(`err${error}`); // for debug
    return Promise.reject(error);
  },
);

export default service;
