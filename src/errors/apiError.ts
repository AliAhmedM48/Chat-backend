import { BaseError } from "./baseError";
import { HttpStatusCode } from "./httpStatusCode";

export class ApiError extends BaseError {

    constructor(
        public name: string,
        public statusCode = HttpStatusCode.INTERNAL_SERVER,
        public isOpertional = true,
        public message = 'Internal Server Error'
    ) {
        super(name, statusCode, isOpertional, message);
    }
}