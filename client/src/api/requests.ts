import { CodeResponse } from '@react-oauth/google';
import { IAuth } from 'interfaces/IAuth';
import { RequestMethodType } from 'enums/RequestMethodType';
import { IssuerType } from 'enums/IssuerType';

export const requestApi = {
    register: (data: IAuth) => ({
        method: RequestMethodType.POST,
        url: '/auth/register',
        data,
    }),
    login: (data: IAuth) => ({
        method: RequestMethodType.POST,
        url: '/auth/login',
        data,
    }),
    authGoogle: (data: CodeResponse) => ({
        method: RequestMethodType.POST,
        url: '/auth/auth-google',
        data,
    }),
    getRefreshToken: (refreshToken: string, iss: string) => ({
        method: RequestMethodType.POST,
        url: '/auth/refresh-token',
        data: {
            refreshToken,
            iss,
        },
    }),
    getEvents: (token: string) => ({
        method: RequestMethodType.GET,
        url: '/events',
        headers: { Authorization: token },
    }),
};
