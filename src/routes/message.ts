import MessageController from "../controllers/message";
import createMessageValidations from "../validations/message";
import validateMongoID from "../middlewares/validateMongoID";

import { Router } from "express";

const messageRoutes = (controller: MessageController) => {
  const router = Router();

  router
    .route("/")
    .post(createMessageValidations, controller.createMessage)
    .delete(controller.deleteMessage); // two cases, mutiple messages or one, [body.id]

  router
    .route("/:chatId")
    .all(validateMongoID)
    .get(controller.getAllMessages);

  router
    .route("/:id")
    .all(validateMongoID)
    .put(controller.updateMessage);

  return router;
}

export default messageRoutes;