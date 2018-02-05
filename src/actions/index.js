import httpServer from '../../tools/httpServer';
import GitHub from './github';

const project = {
  github:{
    baseURL: 'https://api.github.com',
    token: '11f1779c52f5b929e0627b429b8c7a3bf8806ce1'
  }
};

const actions = {
  http(pName, method, url, data){
    return httpServer({method: method,url: url}, data, ...Object.values(project[pName])).then((res) => {
      return res;
    })
  }
};


export default Object.assign(
    actions, GitHub
);