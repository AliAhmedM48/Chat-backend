import validatorMiddleware from "../middlewares/validate";
import User from "../models/user";

import { check } from "express-validator";

export const createGroupValid = [
  check("users")
    .isArray()
    .withMessage("users should be array of string")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (usersIds, { req }) => {
      const id = (req as any).loggedUser._id; // logged user

      if (!usersIds?.includes(id.toString())) {
        usersIds?.push(id.toString());
      }
      const usersSet = new Set(usersIds);
      usersIds = Array.from(usersSet);

      req.users = usersIds;

      const result = await User.find({ _id: { $exists: true, $in: usersIds } });
      if (result.length < 2 || result.length !== usersIds.length) {
        throw new Error(`Invalid users Ids`);
      }
    }),

  validatorMiddleware,
];

export const createPrivateValid = [
  check("receiverId")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom(async (receiverId) => {
      const result = await User.findOne({ _id: receiverId });
      if (!result) {
        throw new Error(`Invalid receiver Id`);
      }
    }),

  validatorMiddleware,
];
