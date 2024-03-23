import { Router } from "express";
import { loginValidator, registerValidator } from "../validations/auth";
import AuthController from "../controllers/auth";
import checkUserAuthentication from "../middlewares/authenticateUser";

const authRoutes = (controller: AuthController) => {
  const router = Router();
  /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers a new user
 *     description: Registers a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirmation:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success message and user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 data:
 *                   type: object
 *                   description: User data.
 *       400:
 *         description: Bad request error
 */



  router.post("/register", registerValidator, controller.register);


  router.post("/login", loginValidator, controller.login);


  router.put("/logout", checkUserAuthentication, controller.logout);

  return router;
};

export default authRoutes;
