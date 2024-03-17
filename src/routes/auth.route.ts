import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

class AuthRoutes {
  router = Router();
  controller = new AuthController();
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router
      .post("/register", this.controller.register)
      .post("/login", this.controller.login);
  }
}

export default new AuthRoutes().router;
