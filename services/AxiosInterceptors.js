import axios from 'axios';
import Cookies from 'js-cookie';
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },

});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let userInfo;
  if (Cookies.get('nunua_sessions')) {
    userInfo = JSON.parse(Cookies.get('nunua_sessions'));
  }


  // console.log('Admin Http Services Cookie Read : ' + company);
  // let companyName = JSON.stringify(company);

  return {
    ...config,
    headers: {
      authorization: userInfo ? `Bearer ${userInfo.token}` : null
    },
  
    
  };
});

const responseBody = (response) => response;
const catchError = (error) => error;

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody).catch(catchError),

  post: (url, body,headers) => instance({
    method:'post',
    url:process.env.NEXT_PUBLIC_BACKEND_URL + url,
    data:body,
    withCredentials:false,
    crossdomain:true,
    headers,
    mode:'no-cors'
  }),

  put: (url, body, headers) =>
    instance.put(url, body, headers),

  patch: (url, body, headers) => instance.patch(url, body, headers).then(responseBody).catch(catchError),

  delete: (url, body, headers) => instance.delete(url, body, headers).then(responseBody),
};

export default requests;
