import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
})

export default api;