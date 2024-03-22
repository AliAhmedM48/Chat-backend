import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
<<<<<<< Updated upstream
import { NotFoundError } from "../errors/notFoundError";
=======
>>>>>>> Stashed changes

import AuthService from "../services/auth";
import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";

export default class AuthController {
  constructor(private service: AuthService) { }

  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { firstName, lastName, email, password, avatar } = req.body;
<<<<<<< Updated upstream
      const hashedPassword = await bcrypt.hash(password, 7);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatar,
      });
      res.status(201).json({ success: true, data: user });
=======
      const user = await this.service.register(firstName, lastName, email, password, avatar);
      res.status(HttpStatusCode.CREATED).json({ success: true, data: user });
>>>>>>> Stashed changes
    }
  );

  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { email, password } = req.body;
<<<<<<< Updated upstream
      const user = await User.findOne({ email });

      const isMatch = await bcrypt.compare(
        password,
        user ? user!.password : ""
      );

      if (!isMatch || !user) {
        return next(new NotFoundError("Invalid password or email"));
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
=======
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
>>>>>>> Stashed changes
    }
  );
}
