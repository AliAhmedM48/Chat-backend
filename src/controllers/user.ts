import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
<<<<<<< Updated upstream
import { ApiError } from "../errors/apiError";
import { NotFoundError } from "../errors/notFoundError";

export class UserController {
  getAllUsers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const users = await User.find();
      if (users.length === 0) {
        return next(new NotFoundError('Users not found'));
      }
      res.status(200).json({ success: true, data: users });
=======

import UserService from "../services/users";
import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";

export default class UserController {

  constructor(private service: UserService) { }

  getAllUsers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.service.getAllUsers();
      res.status(HttpStatusCode.OK).json({ success: true, data: users });
>>>>>>> Stashed changes
    }
  );

  getOneUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { id } = req.params;
<<<<<<< Updated upstream

      const user = await User.findById(id);
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      res.status(200).json({ success: true, data: user });
=======
      const user = await this.service.getOneUser(id);
      if (!user) return next(new NotFoundError('User not found'));
      res.status(HttpStatusCode.OK).json({ success: true, data: user });
>>>>>>> Stashed changes
    }
  );

  updateUser = asyncHandler(
<<<<<<< Updated upstream
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;
      console.log(id);

      const { firstName, lastName, email, password, avatar } = req.body;

      let hashedPassword = null;
      if (password)
        hashedPassword = await bcrypt.hash(password, 7);

      const user = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          passwordHash: hashedPassword || password,
          avatar,
        },
        { new: true }
      );
      console.log({ user });

      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      res.status(200).json({ success: true, data: user });
=======
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {

      if (Object.keys(req.body).length === 0) {
        return res.status(HttpStatusCode.NOT_MODIFIED).end();
      }

      const id = (req as any).loggedUser._id; // logged user
      const { firstName, lastName, email, password, avatar, isOnline } = req.body;
      const user = await this.service.updateUser(id, firstName, lastName, email, password, avatar, isOnline)
      if (!user) return next(new NotFoundError('User not found'));
      res.status(HttpStatusCode.OK).json({ success: true, data: user });
>>>>>>> Stashed changes
    }
  );

  deleteUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
<<<<<<< Updated upstream
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return next(new ApiError("User not found", 404));
      }
      res.status(200).json({ success: true, data: user });
    }
  );
=======
      const id = (req as any).loggedUser._id; // logged user
      const user = await this.service.deleteUser(id);
      res.status(HttpStatusCode.NO_CONTENT).end();
      // res.status(HttpStatusCode.OK).json({ success: true, data: user });
    }
  );

>>>>>>> Stashed changes
}
