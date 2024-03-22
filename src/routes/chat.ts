import { Router } from "express";
import ChatController from "../controllers/chat";
import { validateMongoID } from "../middlewares/validateMongoID";
import { createChatValidations } from "../validations/chat";

class ChatRoutes {
  router = Router();
  chatController = new ChatController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.route("/").get(this.chatController.getByUserIdOrByChatId);

    this.router
      .route("/createGroup")
      .post(createChatValidations, this.chatController.createGroup);

    this.router
      .route("/:id")
      .all(validateMongoID)
      .get(this.chatController.getByUserIdOrByChatId)

      .put(this.chatController.updateChat)
      .delete(this.chatController.deleteChat);
  }
}

export default new ChatRoutes().router;
