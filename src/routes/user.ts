import UserController from "../controllers/user";
import validateMongoID from "../middlewares/validateMongoID";

import { Router } from "express";

export default class UserRoutes {
  public expressrRouter = Router();
  constructor(private controller: UserController) {
    this.intializeRoutes();
  }

  intializeRoutes() {

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
    this.router.route("/")
      .get(this.controller.getAllUsers)
      .delete(this.controller.deleteUser)
      .put(this.controller.updateUser);

    this.router.route("/:id")
      .get(validateMongoID, this.controller.getOneUser);
  }
}

export default new UserRoutes().router;
