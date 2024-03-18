import { BaseError } from "./baseError";
import { HttpStatusCode } from "./httpStatusCode";

export class NotFoundError extends BaseError {
    constructor(message = '404 Not Found') {
        super('404 Not Found', HttpStatusCode.NOT_FOUND, true, message);
    }
}

