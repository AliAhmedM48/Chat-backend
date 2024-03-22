import MessageController from "../controllers/message";
import createMessageValidations from "../validations/message";
import validateMongoID from "../middlewares/validateMongoID";

import { Router } from "express";

export default class MessageRoutes {
  expressrRouter = Router();
  constructor(private controller: MessageController) {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.expressrRouter
      .route("/")
      .post(createMessageValidations, this.controller.createMessage)
      .delete(this.controller.deleteMessage); // two cases, mutiple messages or one, [body.id]

    this.expressrRouter
      .route("/:chatId")
      .all(validateMongoID)
      .get(this.controller.getAllMessages);

    this.expressrRouter
      .route("/:id")
      .all(validateMongoID)
      .put(this.controller.updateMessage);
  }
}

