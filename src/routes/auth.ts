import { Router } from "express";
import { loginValidator, registerValidator } from "../validations/auth";
import AuthController from "../controllers/auth";
import checkUserAuthentication from "../middlewares/authenticateUser";

export default class AuthRoutes {
  expressrRouter = Router();

  constructor(private controller: AuthController) {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.expressrRouter
      .post("/register", registerValidator, this.controller.register)
      .post("/login", loginValidator, this.controller.login);
  }
}

