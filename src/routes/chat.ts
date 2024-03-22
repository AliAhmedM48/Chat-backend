import ChatController from "../controllers/chat";
import validateMongoID from "../middlewares/validateMongoID";
import createChatValidations from "../validations/chat";

import { Router } from "express";

// export default class  ChatRoutes {
class ChatRoutes {
  expressrRouter = Router();
  constructor(private controller: ChatController) {
    this.intializeRoutes();
  }

  private intializeRoutes() {

    this.expressrRouter.route("/")
      .get(this.controller.getByUserIdOrByChatId)

    this.expressrRouter.route("/createGroup")
      .post(createChatValidations, this.controller.createGroup);

    this.expressrRouter.route("/:id")
      .all(validateMongoID)
      .get(this.controller.getByUserIdOrByChatId)

      .put(this.controller.updateChat)
      .delete(this.controller.deleteChat);

  }
}

export default ChatRoutes;