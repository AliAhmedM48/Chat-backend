import BaseError from "./baseError";
import HttpStatusCode from "./httpStatusCode";

<<<<<<< Updated upstream
class BadRequestError extends BaseError {
    constructor(message: string = "Bad Request Error") {
        super('Bad Request Error', HttpStatusCode.BAD_REQUEST, true, message);
=======
export default class BadRequestError extends BaseError {
    constructor(message: string = "Bad Request") {
        super('Bad Request', HttpStatusCode.BAD_REQUEST, true, message);
>>>>>>> Stashed changes
    }
}