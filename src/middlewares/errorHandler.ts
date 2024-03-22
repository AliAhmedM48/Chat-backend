import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import BaseError from "../errors/baseError";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  if (err instanceof BaseError) {
    res.status(err.statusCode).json(err.toObject());
  } else {
    res.status(500).json({
      name: "InternalServerError",
      error: err,
      message: "Internal Server Error",
      stack: err.stack
    });
  }
}

export default errorHandler;
