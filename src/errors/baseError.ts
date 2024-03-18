import { HttpStatusCode } from "./httpStatusCode";

export class BaseError extends Error {

    constructor(
        public readonly name: string,
        public readonly statusCode: HttpStatusCode,
        public readonly isOperational: boolean,
        message: string
    ) {
        super(message);

        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);

    }
}
