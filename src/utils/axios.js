import axios from 'axios';
import { API_URL } from 'setting';

const axiosServices = axios.create({ baseURL: API_URL || 'http://localhost:3010/' });

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
