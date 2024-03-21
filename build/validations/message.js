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
exports.createMessageValidations = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("../middlewares/validate"));
const user_1 = require("../models/user");
const chat_1 = require("../models/chat");
const notFoundError_1 = require("../errors/notFoundError");
exports.createMessageValidations = [
    (0, express_validator_1.check)("chatId")
        .optional().isMongoId().withMessage("Invalid ID formate")
        .custom((chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield chat_1.Chat.findOne({ _id: chatId });
        if (!chat) {
            throw new notFoundError_1.NotFoundError(`Invalid chat Id`);
        }
    })),
    (0, express_validator_1.check)("receiverId")
        .optional().isMongoId().withMessage("Invalid ID formate")
        .custom((receiverId) => __awaiter(void 0, void 0, void 0, function* () {
        const receiver = yield user_1.User.findOne({ _id: receiverId });
        if (!receiver) {
            throw new notFoundError_1.NotFoundError(`Invalid receiver Id`);
        }
    })),
    validate_1.default,
];
