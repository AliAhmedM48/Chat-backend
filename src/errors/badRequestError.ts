import { BaseError } from "./baseError";
import { HttpStatusCode } from "./httpStatusCode";

class BadRequestError extends BaseError {
    constructor(message: string = "Bad Request Error") {
        super('Bad Request Error', HttpStatusCode.BAD_REQUEST, true, message);
    }
}

export = BadRequestError;