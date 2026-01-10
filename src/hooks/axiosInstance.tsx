// Generate function code here
import axios from 'axios';
import type { LoginStoreApi } from '@/providers/login-provider'

const axiosInstance = axios.create();

let loginStore: LoginStoreApi | null = null;

export const setLoginStore = (store: LoginStoreApi) => {
    console.log('setLoginStore called, store:', store);
    loginStore = store;
    console.log('Store state after setting:', loginStore?.getState());
};

axiosInstance.interceptors.request.use((config) => {
    if (loginStore) {
        const { coolifyId } = loginStore.getState();

        if (coolifyId) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${coolifyId}`;
        }
    }
    console.log('Nope')
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;