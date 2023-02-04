import fs from 'fs';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import appConfig from 'config/config';
import { ErrorCode } from 'enums/ErrorCode';
import RouteError from 'utils/RouteError';
import { tokenVerificationErrorHandler } from 'utils/tokenVerificationErrorHandler';

const jwtPublicCert = fs.readFileSync(appConfig.JWT_PUBLIC_CERT_PATH, 'utf8');

export const validateToken = (req: Request, res: Response, next: () => void) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            errors: [new RouteError(ErrorCode.UNAUTHORIZED_AUTH_FAILED)],
        });
    }

    try {
        const validToken = verify(token, jwtPublicCert);

        if (validToken) {
            return next();
        }
    } catch (err: any) {
        tokenVerificationErrorHandler(err, res, ErrorCode.UNAUTHORIZED_TOKEN_EXPIRED);
    }
};
