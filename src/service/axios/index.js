import axios from "axios";
import config from '../../config';
import { Store } from '../../redux/store';

const instance = axios.create({
  baseURL: config.backendApi,
  timeout: 1000,
});

instance.interceptors.request.use(
  async (config) => {
    const token = Store.getState().accessToken.tokenReducer
      ? `Bearer ${Store.getState().accessToken.tokenReducer.access_token}`
      : undefined;

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  },
);

export default instance;
