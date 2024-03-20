import { checkUserAuthentication } from "./../middlewares/authenticateUser";
import { Router } from "express";
import ChatController from "../controllers/chat";
import { validateMongoID } from "../middlewares/validateMongoID";
import { checkChatMembership } from "../middlewares/checkChatMembership";
import { createChatValidations } from "../validations/chat";

class ChatRoutes {
  router = Router();
  chatController = new ChatController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // * add avatar to chat model
    // * add isGroup to chat model = default false
    this.router
      .route("/createGroup")
      .post(
        checkUserAuthentication,
        createChatValidations,
        this.chatController.createChat
      );

    this.router
      .route("/:id")
      .all(validateMongoID, checkUserAuthentication)
      // * load all chats by [user id]
      .get(this.chatController.getByUserIdOrByChatId)
      // * middleware to check by [chat id , user id] if user is already in chat/group
      .put(this.chatController.updateChat)
      // * middleware to check by [chat id , user id] if user is already in chat/group
      // * remove user from group
      .delete(this.chatController.deleteChat);
  }
}

export default new ChatRoutes().router;
