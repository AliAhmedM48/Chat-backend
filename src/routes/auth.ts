import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { loginValidator, registerValidator } from "../validations/auth";
import { checkUserAuthentication } from "../middlewares/authenticateUser";

class AuthRoutes {
  router = Router();
  controller = new AuthController();
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router
      .post("/register", registerValidator, this.controller.register)
      .post("/login", loginValidator, this.controller.login)
      .put("/logout", checkUserAuthentication, this.controller.logout);
  }
}

export default new AuthRoutes().router;
