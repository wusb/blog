import axios from 'axios';

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});


axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
});

function errorState(response) {
  //错误处理
}

function successState(res) {
  //正确处理
}
const httpServer = (opts, data, baseURL, token) => {

  let Public = { //公共参数

  };

  let httpDefaultOpts = { //http默认配置
    method:opts.method,
    baseURL: baseURL,
    url: opts.url,
    timeout: 10000,
    params: Object.assign(Public, data),
    data: Object.assign(Public, data),
    headers: opts.method=='get' ? {
      "Authorization" : `Bearer ${token}`,
      "X-Requested-With": 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    } : {
      "Authorization" : `Bearer ${token}`,
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  };

  if(opts.method=='get'){
    delete httpDefaultOpts.data
  }else{
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function(resolve, reject) {
    axios(httpDefaultOpts).then(
        (res) => {
          successState(res);
          resolve(res)
        }
    ).catch(
        (response) => {
          errorState(response);
          reject(response)
        }
    )

  });

  return promise
};

export default httpServer