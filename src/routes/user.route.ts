import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateId } from "../middlewares/validateId.middleware";

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
      .all(validateId)
      .get(this.controller.getOneUser)
      .put(this.controller.updateUser)
      .delete(this.controller.deleteUser);
  }
}

export default new UserRoutes().router;
