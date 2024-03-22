import UserController from "../controllers/user";
import validateMongoID from "../middlewares/validateMongoID";

import { Router } from "express";


const userRoutes = (controller: UserController) => {
  const router = Router();
  /**
      * @swagger
      * /api/v1/users:
      *  get:
      *    summary: Get all users
      *    description: Retrieve a list of all users.
      *  responses:
      *    200:
      *      description: A list of user.
      */
  router.route("/")
    .get(controller.getAllUsers)
    .delete(controller.deleteUser)
    .put(controller.updateUser);

  router.route("/:id")
    .get(validateMongoID, controller.getOneUser);

  return router;
}

export default userRoutes