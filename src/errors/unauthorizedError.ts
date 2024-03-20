import { BaseError } from "./baseError";
import { HttpStatusCode } from "./httpStatusCode";

export class UnauthorizedError extends BaseError {
  constructor(message = "401 Unauthorized") {
    super("401 Unauthorized", HttpStatusCode.UNAUTHORIZED, true, message);
  }
}
