import BaseError from "./baseError";
import HttpStatusCode from "./httpStatusCode";

export default class NotFoundError extends BaseError {
    constructor(message = 'Not Found') {
        super('Not Found', HttpStatusCode.NOT_FOUND, true, message);
    }
}

