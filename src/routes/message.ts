import { Router } from "express";
import { MessageController } from "../controllers/message";
import { validateMongoID } from "../middlewares/validateMongoID";
import { createMessageValidations } from "../validations/message";

class MessageRoutes {
  router = Router();
  controller = new MessageController();
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router
      .route("/")
      .post(createMessageValidations, this.controller.createMessage)
      .delete(this.controller.deleteMessage); // two cases, mutiple messages or one, [body.id]

    this.router
      .route("/:chatId")
      .all(validateMongoID)
      .get(this.controller.getAllMessages);

    this.router
      .route("/:id")
      .all(validateMongoID)
      .put(this.controller.updateMessage);
  }
}

export default new MessageRoutes().router;
