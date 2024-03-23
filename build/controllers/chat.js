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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const httpStatusCode_1 = __importDefault(require("../errors/httpStatusCode"));
const notFoundError_1 = __importDefault(require("../errors/notFoundError"));
const app_1 = require("../app");
// interface IChatController {
//   createGroup(req: Request, res: Response, next: NextFunction): Promise<void>;
//   getByUserIdOrByChatId(req: Request, res: Response, next: NextFunction): Promise<void>;
//   updateChat(req: Request, res: Response, next: NextFunction): Promise<void>;
//   deleteChat(req: Request, res: Response, next: NextFunction): Promise<void>;
// }
class ChatController {
    constructor(service) {
        this.service = service;
        this.createGroup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { name, lastMessage } = req.body;
            let users = req.users; // from creation validation middleware
            const chat = yield this.service.createGroup(users, name, lastMessage);
            chat.users.forEach((user) => {
                if (user._id) {
                    console.log(user._id);
                    app_1.pusher.trigger(user._id.toString(), "conversation:new", chat);
                }
            });
            res.status(httpStatusCode_1.default.CREATED).json({ message: "create OK", chat });
        }));
        this.createChatPrivate = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { receiverId } = req.body;
            let loggedUserId = req.loggedUser._id;
            const chat = yield this.service.createPrivateChat(loggedUserId, receiverId);
            chat.users.forEach((user) => {
                if (user._id) {
                    console.log(user._id);
                    app_1.pusher.trigger(user._id.toString(), "conversation:new", chat);
                }
            });
            res.status(httpStatusCode_1.default.CREATED).json({ message: "create OK", chat });
        }));
        this.getByUserIdOrByChatId = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            // logged user
            if (!id) {
                id = req.loggedUser._id;
            }
            let chats = yield this.service.findChatsByChatId(id);
            if (chats.length === 0) {
                chats = yield this.service.findChatsByUserId(id);
            }
            
            chats.forEach((chat) => console.log(chat.isEmpty));
            res.status(httpStatusCode_1.default.OK).json(chats);
        }));
        this.updateChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const chat = yield this.service.updateChat(id, req.body);
            if (!chat) {
                return next(new notFoundError_1.default("chat not found"));
            }
            res.status(httpStatusCode_1.default.OK).send(chat);
        }));
        // !!!!!!!!!!!!!!!
        this.leaveChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { chatId } = req.body;
            const id = req.loggedUser._id; // logged user
            const chat = yield this.service.leaveChat(id, chatId);
            if (!chat) {
                return next(new notFoundError_1.default("chat not found"));
            }
            res.status(httpStatusCode_1.default.NO_CONTENT).end();
        }));
    }
}
exports.default = ChatController;
