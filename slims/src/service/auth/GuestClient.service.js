import axios from 'axios';
import Message from '../../components/commons/Message';
import { API_CONFIG } from '../../constants/api_config';

const GuestClient = axios.create({
    baseURL: API_CONFIG.baseUrl,
    headers: {
        Accept: 'application/json'
    },
    // data: {
    //     scope: '',
    //     id: 34,
    // }
});
export default GuestClient;

function getUrl(config) {
    if (config.baseURL) {
        return config.url.replace(config.baseURL, '');
    }
    return config.url;
}

// Intercept all requests
GuestClient.interceptors.request.use(
    config => {
        console.log(`%c ${config.method.toUpperCase()} - ${getUrl(config)}:`, 'color: #0086b3; font-weight: bold', config,);
        return config;
    }, error => Promise.reject(error));
// Intercept all responses
GuestClient.interceptors.response.use(
    async response => {
        console.log(`%c ${response.status} - ${getUrl(response.config)}:`,
            'color: #008000; font-weight: bold',
            response);
        return response;
    },
    error => {
        console.log(`%c ${error.response.status} - ${getUrl(error.response.config)}:`, 'color: #a71d5d; font-weight: bold', error.response,);
        if (error.response.data.message) {
            Message.showToast(error.response.data.message)
        }
        return Promise.reject(error);
    },
);