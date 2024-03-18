import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { loginValidator, registerValidator } from "../validations/auth";

class AuthRoutes {
  router = Router();
  controller = new AuthController();
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router
      .post("/register", registerValidator, this.controller.register)
      .post("/login", loginValidator, this.controller.login);
  }
}

export default new AuthRoutes().router;
