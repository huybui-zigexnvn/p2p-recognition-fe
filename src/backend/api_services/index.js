import axios from 'axios';

const ApiService = {
    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        axios.interceptors.request.use(
            (config) => {
                return config;
            }
        );
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