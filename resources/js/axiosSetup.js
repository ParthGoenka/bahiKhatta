import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
// Set up Axios to use JWT from localStorage
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.defaults.withCredentials = false;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;
