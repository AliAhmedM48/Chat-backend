import { Router } from "express";
import { loginValidator, registerValidator } from "../validations/auth";
import { checkUserAuthentication } from "../middlewares/authenticateUser";

constructor(private controller: AuthController) {
  this.intializeRoutes();
}

  private intializeRoutes() {
  this.expressrRouter
    .post("/register", registerValidator, this.controller.register)
    .post("/login", loginValidator, this.controller.login)
    .put("/logout", checkUserAuthentication, this.controller.logout);
}
}

