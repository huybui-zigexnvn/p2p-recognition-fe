import axios from 'axios';
import router from '../../router'

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
    axios.interceptors.request.use(
      (config) => {
        if(!!window.localStorage.getItem('token')){
          config.headers.Authorization = window.localStorage.getItem('token')
        }
        config.headers['Content-Type'] = 'application/json'
        return config;
      }
    );
    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response.status == 403) router.push("/not-found");
      return Promise.reject(error);
    });
  },

  get(resource, params={}) {
    return axios.get(resource, { params });
  },

  post(resource, data, options={}) {
    return axios.post(resource, data, options);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource, data = {}) {
    return axios.delete(resource, { data: data });
  },
};

export default ApiService;
