"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
// ^ Schema
const chatSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'Name is required'] }, // group name or username
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: [true, 'Users is Required'] }],
    lastMessage: { type: mongoose_1.Schema.ObjectId, ref: 'Message', required: [true, 'Last Message is Required'] }
}, { timestamps: true });
// ^ Model
const Chat = (0, mongoose_1.model)('Chat', chatSchema, 'chats');
