"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const validate_1 = __importDefault(require("../middlewares/validate"));
const user_1 = __importDefault(require("../models/user"));
const express_validator_1 = require("express-validator");
const registerValidator = [
    (0, express_validator_1.check)("firstName").notEmpty().withMessage("First Name is required"),
    (0, express_validator_1.check)("lastName").notEmpty().withMessage("Last Name is required"),
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Invalid email")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email: value });
        if (user) {
            throw new Error("E-mail already exist");
        }
    })),
    (0, express_validator_1.check)("password").notEmpty().withMessage("password is required"),
    (0, express_validator_1.check)("passwordConfirmation")
        .notEmpty()
        .withMessage("password confirmation required")
        .custom((val, { req }) => {
        if (val !== req.body.password) {
            throw new Error("Password confirmation incorrect");
        }
        return true;
    }),
    validate_1.default,
];
exports.registerValidator = registerValidator;
const loginValidator = [
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Invalid email address"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("password is required"),
    validate_1.default,
];
exports.loginValidator = loginValidator;
