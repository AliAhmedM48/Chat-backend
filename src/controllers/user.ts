import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import UserService from "../services/users";
import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";

export default class UserController {
  constructor(private service: UserService) {}

  getAllUsers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.service.getAllUsers();
      res.status(HttpStatusCode.OK).json({ success: true, data: users });
    }
  );

  getOneUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { id } = req.params;
      const user = await this.service.getOneUser(id);
      if (!user) return next(new NotFoundError("User not found"));
      res.status(HttpStatusCode.OK).json({ success: true, data: user });
    }
  );

  updateUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      if (Object.keys(req.body).length === 0) {
        return res.status(HttpStatusCode.NOT_MODIFIED).end();
      }

      const id = (req as any).loggedUser._id; // logged user
      const { firstName, lastName, email, password, avatar, isOnline } =
        req.body;
      const user = await this.service.updateUser(
        id,
        firstName,
        lastName,
        email,
        password,
        avatar,
        isOnline
      );
      if (!user) return next(new NotFoundError("User not found"));
      res.status(HttpStatusCode.OK).json({ success: true, data: user });
    }
  );

  deleteUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const id = (req as any).loggedUser._id; // logged user
      const user = await this.service.deleteUser(id);
      res.status(HttpStatusCode.NO_CONTENT).end();
      // res.status(HttpStatusCode.OK).json({ success: true, data: user });
    }
  );
}
