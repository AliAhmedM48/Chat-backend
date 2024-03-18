"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const atLeastOneUserValidator = (value) => {
    return value.length > 0;
};
// ^ Schema
const chatSchema = new mongoose_1.Schema({
    // ! ++++++++++++++++++++++++++++
    name: {
        type: String,
        default: "USE_RECEIVER_NAME"
        // required: [true, "Name is required"],
    },
    users: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
        validate: [atLeastOneUserValidator, "At least one user is required"], // Use the custom validator
    },
    lastMessage: {
        type: String,
        default: "",
        // ! during development
        // required: [true, "Last Message is Required"],
    },
    isGroup: {
        type: Boolean,
        default: false,
        // required: [true, "isGroup is Required"],
    },
}, { timestamps: true });
// ^ Model
exports.Chat = (0, mongoose_1.model)("Chat", chatSchema, "chats");
