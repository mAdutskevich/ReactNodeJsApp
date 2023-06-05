import fs from 'fs';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { OAuth2Client, LoginTicket } from 'google-auth-library';
import appConfig from 'config/config';
import { ErrorCode, IssuerType } from 'enums';
import { IToken } from 'interfaces';
import { tokenVerificationErrorHandler, RouteError } from 'utils';

const jwtPublicCert = fs.readFileSync(appConfig.JWT_PUBLIC_CERT_PATH, 'utf8');

export const validateToken = async (req: Request, res: Response, next: () => void) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            errors: [new RouteError(ErrorCode.UNAUTHORIZED_AUTH_FAILED)],
        });
    }

    try {
        const decodedToken: IToken = jwt_decode(token);
        let isTokenValid: string | JwtPayload | LoginTicket = null;
        let isTokenExpired = true;

        if (decodedToken.exp * 1000 > Date.now()) {
            isTokenExpired = false;
        } else {
            return res.status(401).json({
                errors: [new RouteError(ErrorCode.UNAUTHORIZED_TOKEN_EXPIRED)],
            });
        }

        if (decodedToken.iss === IssuerType.CRDENTIALS) {
            try {
                isTokenValid = verify(token, jwtPublicCert);
            } catch (err) {
                tokenVerificationErrorHandler(err, res, ErrorCode.UNAUTHORIZED_TOKEN_EXPIRED);
            }
        } else if (decodedToken.iss === IssuerType.GOOGLE) {
            const googleOauth2Client = new OAuth2Client();

            try {
                isTokenValid = await googleOauth2Client.verifyIdToken({
                    idToken: token,
                });
            } catch (err) {
                return res.status(401).json({
                    errors: [new RouteError(ErrorCode.UNAUTHORIZED_AUTH_FAILED)],
                });
            }
        }

        if (isTokenValid && !isTokenExpired) {
            return next();
        }

        return null;
    } catch (err) {
        return res.status(401).json({
            errors: [new RouteError(ErrorCode.UNAUTHORIZED_AUTH_FAILED)],
        });
    }
};
