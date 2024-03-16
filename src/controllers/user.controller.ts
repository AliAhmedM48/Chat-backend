import { User } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Controller } from '../interfaces/controller.interface';
import mongoose from 'mongoose';

export class UserController implements Controller {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        //#region 
        try {
            const { firstName, lastName, email, password, avatar, isOnline } = req.body;
            const hashedPassword = await bcrypt.hash(password, 7);
            const user = await User.create({ firstName, lastName, email, password: hashedPassword, avatar, isOnline });
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
        //#endregion
    }
    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
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
    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
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
            const { firstName, lastName, email, password, avatar, isOnline } = req.body;
            const hashedPassword = await bcrypt.hash(password, 7);
            const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, passwordHash: hashedPassword, avatar, isOnline }, { new: true });
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
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        //#region 
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(404).json({ success: false, error: 'User not found' });
                return;
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ success: false, error: 'Invalid password' });
                return;
            }
            const token = jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.status(200).json({ success: true, token });
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
        //#endregion
    }
}
