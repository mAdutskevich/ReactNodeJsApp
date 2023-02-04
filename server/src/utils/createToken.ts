import { sign } from 'jsonwebtoken';

export const createToken = (code: string, lifetime: number, cert: string): string => {
    return sign(
        {
            code,
            exp: Math.floor(Date.now() / 1000) + lifetime * 60
        },
        cert,
        { algorithm: 'RS256' }
    );
};
