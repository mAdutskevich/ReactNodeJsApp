import fs from 'fs';
import express from 'express';
import bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';
import md5 from 'md5';
import appConfig from '../config/config';
import model from 'models';
import { ErrorCode } from 'enums/ErrorCode';
import { IRefreshTokenPayload } from 'interfaces/IRefreshToken';
import RouteError from 'utils/RouteError';
import { createToken } from 'utils/createToken';
import { tokenVerificationErrorHandler } from 'utils/tokenVerificationErrorHandler';

const jwtSecretCert = fs.readFileSync(appConfig.JWT_CERT_PATH, 'utf8');
const jwtRefreshSecretCert = fs.readFileSync(appConfig.JWT_REFRESH_CERT_PATH, 'utf8');
const router = express.Router();

router.post('/register', async (req, res) => {
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

        const token = createToken(code, appConfig.TOKEN_LIFETIME, jwtSecretCert);
        const refreshToken = createToken(
            code,
            appConfig.REFRESH_TOKEN_LIFETIME,
            jwtRefreshSecretCert,
        );

        res.json({
            token,
            refreshToken,
        });
    }
});

router.post('/login', async (req, res) => {
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
                const token = createToken(user.code, appConfig.TOKEN_LIFETIME, jwtSecretCert);
                const refreshToken = createToken(
                    user.code,
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

router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const decodedRefreshToken = verify(refreshToken, jwtRefreshSecretCert, {
            algorithms: ['RS256'],
        }) as IRefreshTokenPayload;

        const token = createToken(
            decodedRefreshToken.code,
            appConfig.TOKEN_LIFETIME,
            jwtSecretCert,
        );

        res.json({
            token,
        });
    } catch (err: unknown) {
        tokenVerificationErrorHandler(err, res, ErrorCode.UNAUTHORIZED_REFRESH_TOKEN_EXPIRED);
    }
});

export { router };
