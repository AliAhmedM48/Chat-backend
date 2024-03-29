import BaseError from "./baseError";
import HttpStatusCode from "./httpStatusCode";

export default class UnprocessableEntityError extends BaseError {
    constructor(message = 'Unprocessable Entity') {
        super('Unprocessable Entity', HttpStatusCode.UNPROCESSABLE_ENTITY, true, message);
    }
}

