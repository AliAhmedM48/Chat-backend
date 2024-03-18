import { Router } from "express";
import { MessageController } from "../controllers/message";
import { validateMongoID } from "../middlewares/validateMongoID";

class MessageRoutes {
  router = Router();
  controller = new MessageController();
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router
      .route("/")
      // * middleware to check by [chat id , user id] if user is already in chat/group
      .post(this.controller.createMessage)
      // * middleware to check by [chat id , user id] if user is already in chat/group
      // * and user is the owner of this message
      .delete(this.controller.deleteMessage);

    // this.router
    // .route("/messagesInGroup")
    // .post(this.controller.createMessagesInGroup);

    this.router
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

export default new MessageRoutes().router;
