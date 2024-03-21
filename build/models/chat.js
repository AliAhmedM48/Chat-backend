"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const atLeastOneUserValidator = (value) => {
    return value.length > 0;
};
// ^ Schema
const chatSchema = new mongoose_1.Schema({
    name: { type: String, default: "USE_RECEIVER_NAME" },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: String, default: "" },
    isGroup: { type: Boolean, default: false },
}, { timestamps: true });
// ^ Model
exports.Chat = (0, mongoose_1.model)("Chat", chatSchema, "chats");
