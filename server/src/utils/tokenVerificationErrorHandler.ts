import { Response } from 'express';
import { RouteError } from 'utils';
import { ErrorCode } from 'enums';
import { IErrorCode } from 'interfaces';

export const tokenVerificationErrorHandler = (err: unknown, res: Response, errCode: IErrorCode) => {
    // #### jsonwebtoken verify error names can be 3 types:
    // #### 'JsonWebTokenError' || 'JsonWebTokenError' || 'NotBeforeError'

    if (err instanceof Error) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                errors: [new RouteError(errCode)],
            });
        }

        return res.status(401).json({
            errors: [new RouteError(ErrorCode.UNAUTHORIZED_AUTH_FAILED)],
        });
    }

    console.warn('Unique error');
    return res.status(401).json({
        errors: [new RouteError(ErrorCode.UNIQUE_ERROR)],
    });
};
