import { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    //#region
    try {
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
    } catch (error) {
      next(error);
    }
    //#endregion
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    //#region
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      const isMatch = await bcrypt.compare(
        password,
        user ? user!.password : ""
      );

      if (!isMatch || !user) {
        res
          .status(401)
          .json({ success: false, error: "Invalid password or email" });
        return;
      }
      const token = jwt.sign(
        { userId: user._id },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      user.isOnline = true;
      user.password = "";
      res.status(200).json({ success: true, data: user, token });
    } catch (error) {
      next(error);
    }
    //#endregion
  }
}
