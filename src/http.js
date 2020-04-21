import axios from 'axios';
import router from './router'
import {
    Loading,
    Message
} from 'element-ui';

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:3000"
} else {
  axios.defaults.baseURL = ""
}

axios.interceptors.response.use(res => {
       return res;
}, error => {
     Message.error(error.response.data);
    // 返回状态码判定token过期
    const {status} = error.response;
    if (status == 401) {
        Message.error('登录信息失效，请重新登陆');
        localStorage.removeItem('user');
        router.push('/recommend');
    }
    return Promise.reject(error)
});

export function get(url, params, authorization) {
    let config={
        method:'get',
        params:params,
        url:`/api${url}`
    }
    if (authorization) {
        config['auth'] = authorization
      }
  return new Promise((resolve, reject) => {
    axios(config).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });


}
export function post(url, params) {
  let config = {
    url: `/api${url}`,
    method: 'post',
    data: params,
  };
  return new Promise((resolve, reject) => {
   
    axios(config).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
}
export default axios;


