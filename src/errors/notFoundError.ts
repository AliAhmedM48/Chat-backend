import BaseError from "./baseError";
import HttpStatusCode from "./httpStatusCode";

<<<<<<< Updated upstream
export class NotFoundError extends BaseError {
    constructor(message = '404 Not Found') {
        super('404 Not Found', HttpStatusCode.NOT_FOUND, true, message);
=======
export default class NotFoundError extends BaseError {
    constructor(message = 'Not Found') {
        super('Not Found', HttpStatusCode.NOT_FOUND, true, message);
>>>>>>> Stashed changes
    }
}

