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

    toObject(): Record<string, any> {
        return {
            name: this.name,
            statusCode: this.statusCode,
            isOperational: this.isOperational,
            message: this.message,
            stack: this.stack
        }
    }
}
