import UserController from "../controllers/user";
import validateMongoID from "../middlewares/validateMongoID";

import { Router } from "express";

export default class UserRoutes {
  public expressrRouter = Router();
  constructor(private controller: UserController) {
    this.intializeRoutes();
  }

<<<<<<< Updated upstream
  intializeRoutes() {
    this.router.route("/").get(this.controller.getAllUsers);

    this.router
      .route("/:id")
      .all(validateMongoID)
      .get(this.controller.getOneUser)
      .put(validateUpdateRequest, this.controller.updateUser)
      .delete(this.controller.deleteUser);
=======
  private intializeRoutes() {
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
    this.expressrRouter.route("/")
      .get(this.controller.getAllUsers)
      .delete(this.controller.deleteUser)
      .put(this.controller.updateUser);

    this.expressrRouter.route("/:id")
      .get(validateMongoID, this.controller.getOneUser);
>>>>>>> Stashed changes
  }

}

