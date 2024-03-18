import { Router } from "express";
import { MessageController } from "../controllers/message.controller";
import { validateId } from "../middlewares/validateId.middleware";

class MessageRoutes {
  router = Router();
  controller = new MessageController();
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router
      .route("/")
      .post(this.controller.createMessage)
      .delete(this.controller.deleteMessage);

    this.router
      .route("/messagesInGroup")
      .post(this.controller.createMessagesInGroup);

    this.router
      .route("/:id")
      .all(validateId)
      .get(this.controller.getAllMessages)
      .put(this.controller.updateMessage);
  }
}

export default new MessageRoutes().router;
