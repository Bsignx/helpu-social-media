import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://southamerica-east1-helpu-social-media.cloudfunctions.net/api',
});

export default api;
