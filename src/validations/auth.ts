import validatorMiddleware from "../middlewares/validate";
import User from "../models/user";

import { check } from "express-validator";

const registerValidator = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is required"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already exist");
      }
    }),
  check("password").notEmpty().withMessage("password is required"),
  check("passwordConfirmation")
    .notEmpty()
    .withMessage("password confirmation required")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Password confirmation incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("password").notEmpty().withMessage("password is required"),
  validatorMiddleware,
];

export { registerValidator, loginValidator };