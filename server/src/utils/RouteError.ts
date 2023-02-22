import { IErrorCode } from 'interfaces';

export class RouteError extends Error {
    declare code: IErrorCode;

    constructor(code: IErrorCode) {
        super();
        this.code = code;
    }
}
