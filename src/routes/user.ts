import { Router } from "express";
import { UserController } from "../controllers/user";
import { validateMongoID } from "../middlewares/validateMongoID";
import { validateUpdateRequest } from "../validations/user";

class UserRoutes {
  router = Router();
  controller = new UserController();
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.route("/").get(this.controller.getAllUsers);

    this.router
      .route("/:id")
      .all(validateMongoID)
      .get(this.controller.getOneUser)
      .put(validateUpdateRequest, this.controller.updateUser)
      .delete(this.controller.deleteUser);
  }
}

export default new UserRoutes().router;
