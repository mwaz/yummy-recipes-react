import axios from 'axios';

/**
 * Component for handling Api calls without duplicating in each file.
 */
const axiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:5000/yummy_api/v1',
  headers: {
    Authorization: `${localStorage.getItem('token')}`
  }
});

axiosInstance.interceptors.request.use(config => {
  if (
    localStorage.getItem('token') &&
    config.headers.Authorization === 'null'
  ) {
    config.headers.Authorization = `${localStorage.getItem('token')}`;
  }
  return config;
});

export default axiosInstance;
