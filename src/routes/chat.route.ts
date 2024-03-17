import { Router } from "express";
import ChatController from "../controllers/chat.controller";
import { validateId } from "../middlewares/validateId.middleware";

class ChatRoutes {
  router = Router();
  chatController = new ChatController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.route("/").post(this.chatController.createChat);

    this.router
      .route("/:id")
      .all(validateId)
      .get(this.chatController.getAllChats)
      .put(this.chatController.updateChat)
      .delete(this.chatController.deleteChat);
  }
}

export default new ChatRoutes().router;
