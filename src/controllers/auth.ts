import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import AuthService from "../services/auth";
import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";

export default class AuthController {
  constructor(private service: AuthService) { }

  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { firstName, lastName, email, password, avatar } = req.body;
      const user = await this.service.register(firstName, lastName, email, password, avatar);
      res.status(HttpStatusCode.CREATED).json({ success: true, data: user });
    }
  );

  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { email, password } = req.body;
      const result = await this.service.login(email, password);
      if (!result) { return next(new NotFoundError("Invalid password or email")); }
      res.status(HttpStatusCode.OK).json({ success: true, data: result.user, token: result.token });
    }
  );

  logout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const id = (req as any).loggedUser._id; // logged user
      const user = await this.service.logout(id); // isOnline = false
      res.status(HttpStatusCode.NO_CONTENT).end();
    }
  );
}
