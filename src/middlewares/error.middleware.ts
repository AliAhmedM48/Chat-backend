import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import ApiError from "../utils/api.error";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //this is initial values for this properties
  let statusCode = 500;
  let status = "error";

  if (err instanceof ApiError) {
    // If err is an instance of ApiError, use its properties
    statusCode = err.statusCode;
    status = err.status;
  }
  res.status(statusCode).json({
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
