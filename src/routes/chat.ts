import ChatController from "../controllers/chat";
import validateMongoID from "../middlewares/validateMongoID";
import createChatValidations from "../validations/chat";

import { Router } from "express";

const chatRoutes = (controller: ChatController) => {
  const router = Router();

  router
    .route("/")
    .get(controller.getByUserIdOrByChatId)
    .delete(controller.leaveChat);

  router
    .route("/createGroup")
    .post(createChatValidations, controller.createGroup);

  router
    .route("/:id")
    .all(validateMongoID)
    .get(controller.getByUserIdOrByChatId)
    .put(controller.updateChat);

  return router;
};

export default chatRoutes;
