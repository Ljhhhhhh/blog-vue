import axios from 'axios';
// import md5 from 'md5-node';
// import store from '../store';
// import cookie from 'js-cookie';
// import { Toast } from 'vant';

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:1234', // api 的 base_url
  timeout: 5000, // request timeout
  // transformRequest: [function (data) {
  //   data = qs.stringify(data);
  //   console.log('data:', data);
  //   return data;
  // }],
});
// const SECRECT = '1234567890'; // y8q6wjtz3j1emtbwqnhipjgkpynpvmhh
// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers.crossorigin = 'web';
    // const params = JSON.stringify(config.params.data);
    // config.headers.sign = params ? md5(`${params}&${SECRECT}`) : md5(SECRECT);
    // config.headers.token = store.state.token; // 暂时用这个，登录接口完成之后修改
    // config.headers.type = 'B'; // 暂时用这个，登录接口完成之后修改
    // }
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
    if (res.errno !== 0) {
      // console.warn('获取数据可能存在错误，返回code不为200');
      if (res.errno === 402) {
        // cookie.remove('token');
        // Toast.fail('请登录');
        // window.location.href = '/';
      } else if (res.errmsg !== '帐号不存在' && res.errmsg !== '密码错误') {
        // Toast.fail(res.errmsg || '网络错误，请重试');
      }
      return res;
    }
    return res;
  },
  (error) => {
    // console.log(`err${error}`); // for debug
    return Promise.reject(error);
  },
);

export default service;
