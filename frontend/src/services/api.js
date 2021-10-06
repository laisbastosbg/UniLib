import axios from 'axios';

const api = axios.create({
  baseURL: "",
  validateStatus: (status) => true
});

export default api;
