import { BaseError } from "./baseError";
import { HttpStatusCode } from "./httpStatusCode";

export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized") {
    super("Unauthorized", HttpStatusCode.UNAUTHORIZED, true, message);
  }
}
