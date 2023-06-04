import { ErrorCode } from 'enums/ErrorCode';

export type IErrorCode =
    | ErrorCode.UNAUTHORIZED_TOKEN_EXPIRED
    | ErrorCode.UNAUTHORIZED_REFRESH_TOKEN_EXPIRED
    | ErrorCode.UNAUTHORIZED_USER_EXIST
    | ErrorCode.UNAUTHORIZED_USER_NOTFOUND
    | ErrorCode.UNAUTHORIZED_WRONG_CREDENTIALS
    | ErrorCode.UNAUTHORIZED_AUTH_FAILED
    | ErrorCode.UNIQUE_ERROR;
