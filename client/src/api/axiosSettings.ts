import axios from 'axios';
import { requestApi } from './requests';
import { ErrorCode } from 'enums/ErrorCode';
import { IError } from 'interfaces/IError';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        const originalRequest = err.config;

        console.log('1');

        if (
            err.response.status === 401 &&
            !originalRequest._retry &&
            err.response?.data?.errors?.some(
                (error: IError) => error.code === ErrorCode.UNAUTHORIZED_TOKEN_EXPIRED,
            )
        ) {
            originalRequest._retry = true;
            console.log('2');

            const refreshToken = localStorage.getItem('RefreshToken');

            if (refreshToken) {
                try {
                    const tokenResponse = await api(requestApi.getRefreshToken(refreshToken));

                    localStorage.setItem('Authorization', tokenResponse.data.token);
                    originalRequest.headers.Authorization = tokenResponse.data.token;
                    return api(originalRequest);
                } catch (err) {
                    // navigate to login
                }
            } else {
                // navigate to login
            }

            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            
        }

        return Promise.reject(err);
    },
);
