import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_TEST, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;