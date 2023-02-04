import { Response } from 'express';
import RouteError from 'utils/RouteError';
import { ErrorCode } from 'enums/ErrorCode';
import { IErrorCode } from 'interfaces/IErrorCode';

export const tokenVerificationErrorHandler = (err: unknown, res: Response, errCode: IErrorCode) => {
    // jsonwebtoken verify error names can be 3 types:
    // 'JsonWebTokenError' || 'JsonWebTokenError' || 'NotBeforeError'

    if (err instanceof Error) {
        switch (err.name) {
            case 'TokenExpiredError':
                return res.status(401).json({
                    errors: [new RouteError(errCode)],
                });
            default:
                return res.status(401).json({
                    errors: [new RouteError(ErrorCode.UNAUTHORIZED_AUTH_FAILED)],
                });
        }
    } else {
        console.warn('Unique error');
    }
};
