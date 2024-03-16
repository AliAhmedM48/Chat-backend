import { Router } from "express";

import ChatController from "../controllers/chat.controller";

class ChatRoutes {
  router = Router();
  chatController = new ChatController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", this.chatController.getChats);
    this.router.post("/", this.chatController.createChat);
    this.router.get("/:id", this.chatController.getOneChat);
    this.router.put("/:id", this.chatController.updateChat);
    this.router.delete("/:id", this.chatController.deleteChat);
  }
}

export default new ChatRoutes().router;
