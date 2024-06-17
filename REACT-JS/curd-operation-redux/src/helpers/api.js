
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://freetestapi.com/api/v1',
});

export default api;
