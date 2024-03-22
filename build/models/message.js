"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
// ^ Schema
const messageSchema = new mongoose_1.Schema({
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: [true, 'Sender Id is Required'] },
    chatId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Chat', required: [true, 'Chat Id is Required'] },
    seenIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    body: String,
    image: String,
}, { timestamps: true });
// ^ Model
const Message = (0, mongoose_1.model)('Message', messageSchema, 'messages');
exports.default = Message;
