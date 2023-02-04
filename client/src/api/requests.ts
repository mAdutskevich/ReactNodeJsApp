import { RequestMethodType } from 'enums/RequestMethodType';
import { IAuth } from 'interfaces/IAuth';

export const requestApi = {
    register: (data: IAuth) => ({
        method: RequestMethodType.POST,
        url: '/auth/register',
        data,
    }),
    getRefreshToken: (refreshToken: string) => ({
        method: RequestMethodType.POST,
        url: '/auth/refresh-token',
        data: {
            refreshToken,
        },
    }),
    getEvents: (token: string) => ({
        method: RequestMethodType.GET,
        url: '/events',
        headers: { Authorization: token },
    }),
};
