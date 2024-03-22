import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/user";


export class UserController {

  getAllUsers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const users = await User.find();
      res.status(HttpStatusCode.OK).json({ success: true, data: users });
    }
  );

  getOneUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) { return next(new NotFoundError("User not found")); }
      res.status(HttpStatusCode.OK).json({ success: true, data: user });
    }
  );

  updateUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {

      if (Object.keys(req.body).length === 0) {
        res.status(HttpStatusCode.NOT_MODIFIED).end();
        return;
      }

      const id = (req as any).loggedUser._id; // logged user
      const { firstName, lastName, email, password, avatar } = req.body;

      let hashedPassword = null;
      if (password) hashedPassword = await bcrypt.hash(password, 7);

      // * Update logged user data
      const user = await User.findByIdAndUpdate(
        id,
        { firstName, lastName, email, avatar, passwordHash: hashedPassword || password },
        { new: true }
      );

      res.status(HttpStatusCode.OK).json({ success: true, data: user });
    }
  );

  deleteUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const id = (req as any).loggedUser._id; // logged user
      const user = await User.findByIdAndDelete(id);
      res.status(HttpStatusCode.NO_CONTENT).json({ success: true, data: user });
    }
  );
}