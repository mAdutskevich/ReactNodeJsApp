import { sign } from 'jsonwebtoken';
import { ICreateToken } from 'interfaces';

export const createToken = (token: ICreateToken, lifetime: number, cert: string): string => {
    return sign(
        {
            ...token,
            exp: Math.floor(Date.now() / 1000) + lifetime * 60,
        },
        cert,
        { algorithm: 'RS256' },
    );
};
