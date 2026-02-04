// import axios from 'axios';
// import { serverUrl } from './serverUrl';

// const api = axios.create({
//   baseURL: serverUrl,
// });

// // 🔐 Attach JWT to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
import axios from 'axios';
import { serverUrl } from './serverUrl';

// 🔒 ONE axios instance
const api = axios.create({
  baseURL: serverUrl, // e.g. http://localhost:5000
});

// 🔐 Attach JWT BEFORE request is sent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
console.log('Interceptor token:', token);

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
