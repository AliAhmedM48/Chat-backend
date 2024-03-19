import { check } from "express-validator";
import validatorMiddleware from "../middlewares/validate";
import { User } from "../models/user";

export const createChatValidations = [
  check("users")
    .isArray()
    .withMessage("users should be array of string")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (usersIds) => {
      const result = await User.find({ _id: { $exists: true, $in: usersIds } });
      if (result.length < 1 || result.length !== usersIds.length) {
        throw new Error(`Invalid users Ids`);
      }
    }),
  check("isGroup")
    .notEmpty()
    .withMessage("isGroup must be required")
    .isBoolean()
    .withMessage("isGroup must be a boolean value")
    .custom((value) => {
      if (value !== true) {
        throw new Error("isGroup must be true");
      }
      return true;
    }),
  validatorMiddleware,
];
