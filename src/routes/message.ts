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
      // * middleware to check by [chat id , user id] if user is already in chat/group
      .post(this.controller.createMessage)
      // * middleware to check by [chat id , user id] if user is already in chat/group
      // * and user is the owner of this message
      .delete(this.controller.deleteMessage);

    this.expressrRouter
      .route("/:chatId")
      .all(validateMongoID)
      .get(this.controller.getAllMessages);

    this.expressrRouter
      .route("/:id")
      .all(validateMongoID)
      // * middleware to check by [chat id , user id] if user is already in chat/group
      // * get messages by chat id
      .get(this.controller.getAllMessages)
      // * middleware to check by [chat id , user id] if user is already in chat/group
      // * and user is the owner of this message
      .put(this.controller.updateMessage);
  }
}

