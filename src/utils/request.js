import axios from 'axios';
import {Notification} from "@arco-design/web-vue";
import router from "../router/index.js";
import {hideLoading, showLoading} from "./loading.js";

// create an axios instance
const HttpRequest = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1800000 // request timeout
});

// 请求拦截
HttpRequest.interceptors.request.use(
  (config) => {

      // 添加token
      const token = sessionStorage.getItem('sense.access_token');
      if (token){
          config.headers['Authorization'] = `${token}`;
      }

      // 默认开启loading
      if(config.loading !== false){
          showLoading();
      }

      return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
HttpRequest.interceptors.response.use(
    // HTTP状态码为2xx
  (response) => {
      // 关闭loading
      if(response.config.loading !== false){
          hideLoading();
      }

      // 请求正常返回
      if (response.status === 200) {
          return response;
      }

      console.log('xxxxxx', response);

      // 请求异常
      return Promise.reject(new Error('ERROR'));
  },
    // HTTP状态码非2xx
  (error) => {

      // 关闭loading
      if(error.config?.loading !== false){
          hideLoading();
      }

      const { response: { data }, status } = error;

      // 提示
      Notification.error(data?.error)

      // 登录/鉴权异常
      if (status === 401){
          // 跳转至登录页
          router.push({path: '/login'});
      }


      return Promise.reject(error);
  }
);

export default HttpRequest;
