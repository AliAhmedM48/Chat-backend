import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
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
    }
  );

  getOneUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;

      const user = await User.findById(id);
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      res.status(200).json({ success: true, data: user });
    }
  );

  updateUser = asyncHandler(
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
    }
  );

  deleteUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return next(new ApiError("User not found", 404));
      }
      res.status(200).json({ success: true, data: user });
    }
  );
}