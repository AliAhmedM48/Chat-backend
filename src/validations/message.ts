import { check } from "express-validator";
import validatorMiddleware from "../middlewares/validate";
import { User } from "../models/user";
import { Chat } from "../models/chat";
import { NotFoundError } from "../errors/notFoundError";

export const createMessageValidations = [
  check("chatId")
    .optional().isMongoId().withMessage("Invalid ID formate")
    .custom(async (chatId) => {
      const chat = await Chat.findOne({ _id: chatId });
      if (!chat) {
        throw new NotFoundError(`Invalid chat Id`);
      }
    }),

  check("receiverId")
    .optional().isMongoId().withMessage("Invalid ID formate")
    .custom(async (receiverId) => {
      const receiver = await User.findOne({ _id: receiverId });
      if (!receiver) {
        throw new NotFoundError(`Invalid receiver Id`);
      }
    }),

  validatorMiddleware,
];
