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
const validate_1 = __importDefault(require("../middlewares/validate"));
const user_1 = __importDefault(require("../models/user"));
const express_validator_1 = require("express-validator");
const createChatValidations = [
    (0, express_validator_1.check)("users")
        .isArray().withMessage("users should be array of string")
        .isMongoId().withMessage("Invalid ID formate")
        .custom((usersIds_1, _a) => __awaiter(void 0, [usersIds_1, _a], void 0, function* (usersIds, { req }) {
        const id = req.loggedUser._id; // logged user
        if (!(usersIds === null || usersIds === void 0 ? void 0 : usersIds.includes(id.toString()))) {
            usersIds === null || usersIds === void 0 ? void 0 : usersIds.push(id.toString());
        }
        const usersSet = new Set(usersIds);
        usersIds = Array.from(usersSet);
        req.users = usersIds;
        const result = yield user_1.default.find({ _id: { $exists: true, $in: usersIds } });
        if (result.length < 2 || result.length !== usersIds.length) {
            throw new Error(`Invalid users Ids`);
        }
    })),
    validate_1.default,
];
exports.default = createChatValidations;
