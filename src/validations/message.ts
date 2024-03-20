import { check } from "express-validator";
import validatorMiddleware from "../middlewares/validate";
import { User } from "../models/user";
import { Chat } from "../models/chat";

export const createMessageValidations = [
  check("body").notEmpty().withMessage("body is required"),
  check("senderId")
    .notEmpty()
    .withMessage("senderId is required")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (senderId) => {
      const sender = await User.findOne({ _id: senderId });
      if (!sender) {
        throw new Error(`Invalid sender Id`);
      }
    }),
  check("chatId")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (chatId) => {
      const chat = await Chat.findOne({ _id: chatId });
      if (!chat) {
        throw new Error(`Invalid chat Id`);
      }
    }),
  check("receiverId")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (receiverId) => {
      const receiver = await User.findOne({ _id: receiverId });
      if (!receiver) {
        throw new Error(`Invalid receiver Id`);
      }
    }),
  validatorMiddleware,
];
