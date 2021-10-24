import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../../constants/api_config';
import Message from '../../components/commons/Message';

const getAccessToken = async () => {
    try {
        const retrievedItem = await AsyncStorage.getItem('userToken');
        if (retrievedItem !== null) {
            // const item = JSON.parse(retrievedItem);
            // const authorization = `Bearer ${item.token}`;
            const authorization = `Bearer ${retrievedItem}`;
            // We have data!!
            return authorization;
        } return null;
    } catch (error) {
        console.log("error getAccessToken", error)
        // Error retrieving data
    }
};

const SignedInClient = axios.create({
    baseURL: API_CONFIG.baseUrl,
    headers: {
        // Accept: 'application/json',
    },
});

export const getSignedInClient = async () => {
    SignedInClient.defaults.headers.common.Authorization = await getAccessToken();
    return SignedInClient;
};

function getUrl(config) {
    if (config.baseURL) {
        return config.url.replace(config.baseURL, '');
    }
    return config.url;
}
// Intercept all requests
SignedInClient.interceptors.request.use(
    config => {
        console.log(`%c ${config.method.toUpperCase()} - ${getUrl(config)}:`, 'color: #0086b3; font-weight: bold', config,);
        return config;
    }, error => Promise.reject(error));

// Intercept all responses
SignedInClient.interceptors.response.use(
    async response => {
        if (response.status === 401) {
            try {
                const value = await AsyncStorage.getItem('userToken');
                if (value !== null) {
                    // We have data!!
                    // AsyncStorage.clear();
                    // NavigationService.navigate('AuthStackScreen');
                    console.log("no token")
                }
            } catch (error) {
                // Error retrieving data
                console.log(error, 'logged in client error');
            }
        }
        console.log(`%c ${response.status} - ${getUrl(response.config)}:`, 'color: #008000; font-weight: bold', response,);
        return response;
    },
    error => {
        console.log(error, 'error console');
        if (error.response.status === 429) {
            Alert.alert('Too many requests. Please try again later.');
        }
        console.log(`%c ${error.response.status} - ${getUrl(error.response.config)}:`, 'color: #a71d5d; font-weight: bold', error.response,);
        if (error.response.data.message) {
            Message.showToast(error.response.data.message)
        }
        return Promise.reject(error);
    });

const SignedInClientFormData = axios.create({
    baseURL: API_CONFIG.baseUrl,
    headers: {
        // 'content-type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/x-www-form-urlencoded'
    },
});

export const getSignedInClientFormData = async () => {
    SignedInClientFormData.defaults.headers.common.Authorization = await getAccessToken();
    return SignedInClientFormData;
};

// Intercept all requests
SignedInClientFormData.interceptors.request.use(
    config => {
        console.log(`%c ${config.method.toUpperCase()} - ${getUrl(config)}:`, 'color: #0086b3; font-weight: bold', config,);
        return config;
    }, error => Promise.reject(error));

// Intercept all responses
SignedInClientFormData.interceptors.response.use(
    async response => {
        if (response.status === 401) {
            try {
                const value = await AsyncStorage.getItem('userToken');
                if (value !== null) {
                    // We have data!!
                    // AsyncStorage.clear();
                    // NavigationService.navigate('AuthStackScreen');
                    console.log("no token")
                }
            } catch (error) {
                // Error retrieving data
                console.log(error, 'logged in client error');
            }
        }
        console.log(`%c ${response.status} - ${getUrl(response.config)}:`, 'color: #008000; font-weight: bold', response,);
        return response;
    },
    error => {
        console.log(error, 'error console');
        if (error.response.status === 429) {
            Alert.alert('Too many requests. Please try again later.');
        }
        console.log(`%c ${error.response.status} - ${getUrl(error.response.config)}:`, 'color: #a71d5d; font-weight: bold', error.response,);
        if (error.response.data.message) {
            Message.showToast(error.response.data.message)
        }
        return Promise.reject(error);
    });