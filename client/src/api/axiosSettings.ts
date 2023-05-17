import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ErrorCode } from 'enums/ErrorCode';
import { IError } from 'interfaces/IError';
import { IToken } from 'interfaces/IToken';
import { requestApi } from './requests';

export const api = axios.create({
    baseURL: process.env.API_URL,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        const originalRequest = err.config;

        if (
            err.response.status === 401 &&
            !originalRequest.retryReq &&
            err.response?.data?.errors?.some(
                (error: IError) => error.code === ErrorCode.UNAUTHORIZED_TOKEN_EXPIRED,
            )
        ) {
            originalRequest.retryReq = true;

            const refreshToken = localStorage.getItem('RefreshToken');
            const accessToken = localStorage.getItem('Authorization');
            const decodedAccessToken: IToken = jwt_decode(accessToken);

            if (refreshToken) {
                try {
                    const tokenResponse = await api(
                        requestApi.getRefreshToken(refreshToken, decodedAccessToken.iss),
                    );

                    localStorage.setItem('Authorization', tokenResponse.data.token);
                    originalRequest.headers.Authorization = tokenResponse.data.token;

                    return api(originalRequest);
                } catch (error) {
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
