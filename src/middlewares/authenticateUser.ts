import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

import User from "../models/user";
import UnauthorizedError from "../errors/unauthorizedError";

interface JwtPayload {
  userId: string;
}

const checkUserAuthentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1) check if token exist
    let token;

    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) { return next(new UnauthorizedError("you are not login please login to access this route")); }

    //2) verify token (no changes happens, expired token)
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }
    const secretKey: Secret = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(
        new UnauthorizedError(
          "The user that belong to this token does no longer exist"
        )
      );
    }

    (req as any).loggedUser = currentUser;
    next();
  }
);

export default checkUserAuthentication;