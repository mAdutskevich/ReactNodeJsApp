import fs from 'fs';
import express from 'express';
import bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';
import md5 from 'md5';
import jwt_decode from 'jwt-decode';
import { OAuth2Client } from 'google-auth-library';
import model from 'models';
import appConfig from 'config/config';
import { routes } from 'constants/routes';
import { ErrorCode, IssuerType } from 'enums';
import { IRefreshTokenPayload, IToken } from 'interfaces';
import { createToken, RouteError, tokenVerificationErrorHandler } from 'utils';

const jwtSecretCert = fs.readFileSync(appConfig.JWT_CERT_PATH, 'utf8');
const jwtRefreshSecretCert = fs.readFileSync(appConfig.JWT_REFRESH_CERT_PATH, 'utf8');
const googleOauthFile = fs.readFileSync(appConfig.GOOGLE_OAUTH2_PATH);
const googleKeys = JSON.parse(googleOauthFile.toString()).web;

const googleOauth2Client = new OAuth2Client(
    googleKeys.client_id,
    googleKeys.client_secret,
    googleKeys.redirect_uris[0],
);

const router = express.Router();

router.post(routes.register, async (req, res) => {
    const { email, password } = req.body;
    const code = md5(email);
    const user = await model.users.findOne({ where: { code } });

    if (user) {
        res.status(401).json({
            errors: [new RouteError(ErrorCode.UNAUTHORIZED_USER_EXIST)],
        });
    } else {
        bcrypt.hash(password, 10).then((hash) => {
            model.users.create({
                email,
                password: hash,
                code,
            });
        });

        const token = createToken(
            { code, iss: IssuerType.CRDENTIALS },
            appConfig.TOKEN_LIFETIME,
            jwtSecretCert,
        );
        const refreshToken = createToken(
            { code, iss: IssuerType.CRDENTIALS },
            appConfig.REFRESH_TOKEN_LIFETIME,
            jwtRefreshSecretCert,
        );

        res.json({
            token,
            refreshToken,
        });
    }
});

router.post(routes.login, async (req, res) => {
    const { email, password } = req.body;
    const code = md5(email);
    const user = await model.users.findOne({ where: { code } });

    if (!user) {
        res.status(401).json({
            errors: [new RouteError(ErrorCode.UNAUTHORIZED_USER_NOTFOUND)],
        });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.status(401).json({
                    errors: [new RouteError(ErrorCode.UNAUTHORIZED_WRONG_CREDENTIALS)],
                });
            } else {
                const token = createToken(
                    { code: user.code, iss: IssuerType.CRDENTIALS },
                    appConfig.TOKEN_LIFETIME,
                    jwtSecretCert,
                );
                const refreshToken = createToken(
                    { code: user.code, iss: IssuerType.CRDENTIALS },
                    appConfig.REFRESH_TOKEN_LIFETIME,
                    jwtRefreshSecretCert,
                );

                res.json({
                    token,
                    refreshToken,
                });
            }
        });
    }
});

router.post(routes.refreshToken, async (req, res) => {
    const { refreshToken, iss } = req.body;

    if (iss === IssuerType.CRDENTIALS) {
        try {
            const decodedRefreshToken = verify(refreshToken, jwtRefreshSecretCert, {
                algorithms: ['RS256'],
            }) as IRefreshTokenPayload;

            const token = createToken(
                { code: decodedRefreshToken.code, iss: IssuerType.CRDENTIALS },
                appConfig.TOKEN_LIFETIME,
                jwtSecretCert,
            );

            res.json({
                token,
            });
        } catch (err: unknown) {
            tokenVerificationErrorHandler(err, res, ErrorCode.UNAUTHORIZED_REFRESH_TOKEN_EXPIRED);
        }
    } else if (iss === IssuerType.GOOGLE) {
        googleOauth2Client.setCredentials({
            refresh_token: refreshToken,
        });

        try {
            const tokenData = await googleOauth2Client.getAccessToken();

            res.json({
                token: tokenData.res.data.id_token,
            });
        } catch (err) {
            res.status(401).json({
                errors: [new RouteError(ErrorCode.UNAUTHORIZED_AUTH_FAILED)],
            });
        }
    }
});

router.post(routes.authGoogle, async (req, res) => {
    try {
        const { tokens } = await googleOauth2Client.getToken(req.body.code);

        if (!tokens) {
            res.status(401).json({
                errors: [new RouteError(ErrorCode.UNAUTHORIZED_USER_NOTFOUND)],
            });
        }

        const decodedIdToken: IToken = jwt_decode(tokens.id_token);

        if (!decodedIdToken) {
            res.status(401).json({
                errors: [new RouteError(ErrorCode.UNAUTHORIZED_USER_NOTFOUND)],
            });
        }

        const code = md5(decodedIdToken.email);
        const user = await model.users.findOne({ where: { code } });

        if (!user) {
            model.users.create({
                email: decodedIdToken.email,
                password: null,
                code,
            });
        }

        res.json({
            token: tokens.id_token,
            refreshToken: tokens.refresh_token,
        });
    } catch (err) {
        res.status(401).json({
            errors: [new RouteError(ErrorCode.UNAUTHORIZED_AUTH_FAILED)],
        });
    }
});

export { router };
