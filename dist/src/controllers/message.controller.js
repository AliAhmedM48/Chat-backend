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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const message_model_1 = require("../models/message.model");
class MessageController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const { senderId, chatId, body } = req.body;
                const message = yield message_model_1.Message.create({ senderId, chatId, body });
                res.status(201).json({ success: true, data: message });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
    findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const messages = yield message_model_1.Message.find();
                res.status(200).json({ success: true, data: messages });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const { id } = req.params;
                const message = yield message_model_1.Message.findById(id);
                res.status(200).json({ success: true, data: message });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                const { id } = req.params;
                const { senderId, chatId, body } = req.body;
                const message = yield message_model_1.Message.findByIdAndUpdate(id, { senderId, chatId, body }, { new: true });
                res.status(200).json({ success: true, data: message });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
    // ^ Delete messages by IDs
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region 
            try {
                let id = req.params.id;
                if (!id) {
                    id = req.body.id;
                }
                const idsToDelete = Array.isArray(id) ? id : [id];
                const deletedMessages = yield message_model_1.Message.deleteMany({ _id: { $in: idsToDelete } });
                res.status(200).json({ success: true, data: deletedMessages });
            }
            catch (error) {
                next(error);
            }
            //#endregion
        });
    }
}
exports.MessageController = MessageController;
