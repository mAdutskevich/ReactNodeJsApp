import { IErrorCode } from 'interfaces/IErrorCode';

export default class RouteError extends Error {
    declare code: IErrorCode;

    constructor(code: IErrorCode) {
        super();
        this.code = code;
    }
}
