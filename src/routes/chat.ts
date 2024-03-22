import ChatController from "../controllers/chat";
<<<<<<< Updated upstream
import { validateMongoID } from "../middlewares/validateMongoID";
=======
import validateMongoID from "../middlewares/validateMongoID";
import createChatValidations from "../validations/chat";
>>>>>>> Stashed changes

import { Router } from "express";

// export default class  ChatRoutes {
class ChatRoutes {
  expressrRouter = Router();
  constructor(private controller: ChatController) {
    this.intializeRoutes();
  }

<<<<<<< Updated upstream
  intializeRoutes() {
    // * add avatar to chat model
    // * add isGroup to chat model = default false
    this.router.route("/createGroup").post(this.chatController.createChat);

    this.router
      .route("/:id")
      .all(validateMongoID)
      // * load all chats by [user id]
      .get(this.chatController.getAllChats)
      // * middleware to check by [chat id , user id] if user is already in chat/group
      .put(this.chatController.updateChat)
      // * middleware to check by [chat id , user id] if user is already in chat/group
      // * remove user from group
      .delete(this.chatController.deleteChat);
  }
}

export default new ChatRoutes().router;
=======
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
>>>>>>> Stashed changes
