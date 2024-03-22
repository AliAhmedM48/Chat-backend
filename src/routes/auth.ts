import { Router } from "express";
import { loginValidator, registerValidator } from "../validations/auth";
import AuthController from "../controllers/auth";
import checkUserAuthentication from "../middlewares/authenticateUser";

const authRoutes = (controller: AuthController) => {
  const router = Router();

  router
    .post("/register", registerValidator, controller.register)
    .post("/login", loginValidator, controller.login)
    .put("/logout", checkUserAuthentication, controller.logout);

  return router;
}

export default authRoutes
