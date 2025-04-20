import axios from 'axios';
import { getToken } from '../utils/common';

const instance = axios.create({
  baseURL: 'http://mern-ecom-pi.vercel.app/api',

  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
