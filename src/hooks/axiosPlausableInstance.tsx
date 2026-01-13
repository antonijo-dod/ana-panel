// Generate function code here
import axios from 'axios';
import type { LoginStoreApi } from '@/providers/login-provider'

const axiosInstance = axios.create();

let loginStore: LoginStoreApi | null = null;

export const setLoginStore = (store: LoginStoreApi) => {
    loginStore = store;
};

axiosInstance.interceptors.request.use((config) => {
    if (loginStore) {
        const { plausableId } = loginStore.getState();

        if (plausableId) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${plausableId}`;
        }
    }
    console.log('Nope')
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;