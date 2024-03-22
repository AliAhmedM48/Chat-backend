import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import BadRequestError from "../errors/badRequestError";
import Chat from "../models/chat";
import Message from "../models/message";
import HttpStatusCode from "../errors/httpStatusCode";
import UnauthorizedError from "../errors/unauthorizedError";
import NotFoundError from "../errors/notFoundError";
import MessageService from "../services/message";
import ChatService from "../services/chat";

export default class MessageController {

  constructor(
    private messageService: MessageService,
    private chatService: ChatService,

  ) { }

  createMessage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let { receiverId, body, chatId, image } = req.body;
      const id = (req as any).loggedUser._id; // logged user
      if (!(receiverId || chatId)) {
        res.status(401).json({ message: "Send chatId or receiverId" });
        return;
      }
      // * CHECK Chat ID /////// check if chat id is provided
      if (!chatId) {
        // ! FIRST CASE /////// private chat /////// in case client start new chat from users list
        //#region
        const existingChat = await this.chatService.getPreviousChat(id, receiverId);
        chatId = existingChat
          ? existingChat._id
          : (await this.chatService.createPrivateChat(id, receiverId))._id;
        //#endregion
      }
      const message = await this.messageService.createMessage(id, body, id, image, chatId);
      const lastMessage = (await this.chatService.updateLastMessage(chatId, message.body))?.lastMessage;
      res.status(HttpStatusCode.CREATED).json({ success: true, data: message, lastMessage });
    }
  );

  // createMessage = asyncHandler(
  //   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //     let { receiverId, body, chatId, image } = req.body;
  //     const id = (req as any).loggedUser._id; // logged user

  //     if (!(receiverId || chatId)) {
  //       return next(new BadRequestError("send chatId or receiverId"));
  //     }

  //     // * CHECK Chat ID /////// check if chat id is provided
  //     if (!chatId) {
  //       // ! FIRST CASE /////// private chat /////// in case client start new chat from users list
  //       //#region
  //       const existingChat = await Chat.findOne({
  //         $and: [
  //           { isGroup: false },
  //           { users: { $all: [id, receiverId] } },
  //         ],
  //       });

  //       chatId = existingChat
  //         ? existingChat._id
  //         : (await Chat.create({ users: [id, receiverId] }))._id;
  //       //#endregion
  //     }

  //     // ! SECOND CASE /////// create group /////OR///// choose chat from chat list [chat / group]
  //     // ^ check by [chat id , user id] if user is [not] already in chat/group
  //     const existingChat = await Chat.findOne({
  //       _id: chatId,
  //       users: { $in: [id] },
  //     });

  //     if (!existingChat) {
  //       next(new UnauthorizedError("You are not in the chat"));
  //     }

  //     const message = await Message.create({ senderId: id, chatId, body, seenIds: id, image });

  //     const lastMessage = (
  //       await Chat.findByIdAndUpdate(chatId,
  //         { lastMessage: message.body },
  //         { new: true }
  //       )
  //     )?.lastMessage;

  //     res.status(HttpStatusCode.CREATED)
  //       .json({ success: true, data: message, lastMessage });
  //   }
  // );

  getAllMessages = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;

      const checkChats = await this.chatService Chat.findById(chatId);
      if (!checkChats) { return next(new BadRequestError('chat id not found')); }

      if (messages.length === 0 || !messages) {
        return next(new NotFoundError("Messages not found"));
      }
      res.status(200).json({ success: true, data: messages });
    }
  );

  updateMessage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;
      const { senderId, chatId, body } = req.body;
      const message = await Message.findByIdAndUpdate(
        id,
        { senderId, chatId, body },
        { new: true }
      );
      if (!message) {
        return next(new NotFoundError("message not found"));
      }
      res.status(200).json({ success: true, data: message });
    }
  );

  // ^ Delete messages by IDs
  deleteMessage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.body;
      const idsToDelete = Array.isArray(id) ? id : [id];
      const deletedMessages = await Message.deleteMany({
        _id: { $in: idsToDelete },
      });

      if (!deletedMessages) {
        return next(new NotFoundError("messages not found"));
      }
      res.status(200).json({ success: true, data: deletedMessages });
    }
  );
}
