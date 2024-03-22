import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import AuthService from "../services/auth";
import HttpStatusCode from "../errors/httpStatusCode";
import User from "../models/user";
import { bcrypt } from 'bcryptjs';
import { jwt } from 'jsonwebtoken';
import NotFoundError from "../errors/notFoundError";

export default class AuthController {
  constructor(private service: AuthService) { }

  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { firstName, lastName, email, password, avatar } = req.body;
      const hashedPassword = await bcrypt.hash(password, 7);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatar,
      });
      res.status(HttpStatusCode.CREATED).json({ success: true, data: user });
    }
  );

  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) user.isOnline = true;
      user?.save();

      const isMatch = await bcrypt.compare(
        password,
        user ? user!.password : ""
      );

      if (!isMatch || !user) { return next(new NotFoundError("Invalid password or email")); }

      const token = jwt.sign(
        { userId: user._id },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      user.isOnline = true;
      user.password = "";
      res.status(HttpStatusCode.OK).json({ success: true, data: user, token });
    }
  );

  logout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {

      const id = (req as any).loggedUser._id; // logged user
      const user = await User.findByIdAndUpdate(id, { isOnline: false });

      res.status(HttpStatusCode.NO_CONTENT).end();
    }
  );
}
