import BaseError from "./baseError";
import HttpStatusCode from "./httpStatusCode";

export default class BadRequestError extends BaseError {
    constructor(message: string = "Bad Request") {
        super('Bad Request', HttpStatusCode.BAD_REQUEST, true, message);
    }
}