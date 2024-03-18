import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import ApiError from "../utils/api.error";

const errorHandler: ErrorRequestHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  res.status(statusCode).json({
    status: status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
