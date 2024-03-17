import { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Controller } from "../interfaces/controller.interface";
import mongoose from "mongoose";

export class UserController {
  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    //#region
    try {
      const users = await User.find();
      if (!users) {
        res.status(404).json({ message: "Users not found" });
      }
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
    //#endregion
  }
  async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    //#region

    try {
      const { id } = req.params;

      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
    //#endregion
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    //#region

    try {
      const { id } = req.params;
      const { firstName, lastName, email, password, avatar } = req.body;
      const hashedPassword = await bcrypt.hash(password, 7);
      const user = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          passwordHash: hashedPassword,
          avatar,
        },
        { new: true }
      );
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
    //#endregion
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    //#region

    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
    //#endregion
  }
}
