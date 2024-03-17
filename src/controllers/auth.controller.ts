import { Message } from "./../models/message.model";
import { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/api.error";

export class AuthController {
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
      res.status(201).json({ success: true, data: user });
    }
  );

  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      const isMatch = await bcrypt.compare(
        password,
        user ? user!.password : ""
      );

      if (!isMatch || !user) {
        return next(new ApiError("Invalid password or email", 404));
        // res.status(400).json({ Message: "Invalid password or email" });
        // return;
      }
      const token = jwt.sign(
        { userId: user._id },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      user.isOnline = true;
      user.password = "";
      res.status(200).json({ success: true, data: user, token });
    }
  );
}
