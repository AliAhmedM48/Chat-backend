"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMongoID = void 0;
const validate_1 = __importDefault(require("./validate"));
const express_validator_1 = require("express-validator");
exports.validateMongoID = [
    (0, express_validator_1.check)('id')
        .optional().isMongoId().withMessage('Invalid mongo Id'),
    (0, express_validator_1.check)('chatId')
        .optional().isMongoId().withMessage('Invalid mongo Id'),
    validate_1.default
];
