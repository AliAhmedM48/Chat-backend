import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import BadRequestError from "../errors/badRequestError";
import Message from "../models/message";
import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";
import MessageService from "../services/message";
import ChatService from "../services/chat";
import { pusher } from "../app";

export default class MessageController {
  constructor(
    private messageService: MessageService,
    private chatService: ChatService
  ) { }

  createMessage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let { receiverId, body, chatId, image } = req.body;
      const id = (req as any).loggedUser._id; // logged user
      if (!(receiverId || chatId)) {
        return next(new BadRequestError("send chatId or receiverId"));
      }
      if (receiverId == id) {
        return next(
          new BadRequestError("receiverId must be different from loggedUser.id")
        );
      }
      // * CHECK Chat ID /////// check if chat id is provided
      if (!chatId) {
        // ! FIRST CASE /////// private chat /////// in case client start new chat from users list
        //#region
        const existingChat = await this.chatService.getPreviousChat(
          id,
          receiverId
        );
        chatId = existingChat
          ? existingChat._id
          : (await this.chatService.createPrivateChat(id, receiverId))._id;
        //#endregion
      }
      const message = await this.messageService.createMessage(
        id,
        body,
        id,
        image,
        chatId
      );
      const lastMessage = await this.chatService.updateLastMessage(
        chatId,
        message.body
      );

      const updateChat = await this.chatService.updateChat(chatId, {
        isEmpty: false,
      });

      await pusher.trigger(chatId, "messages:new", message);

      const lastMessagee = lastMessage?.lastMessage;
      const users = lastMessage?.users;

      users!.map((user) => {
        pusher.trigger(user._id.toString()!, "conversation:update", {
          id: chatId,
          lastMessagee,
        });
      });

      res
        .status(HttpStatusCode.CREATED)
        .json({ success: true, data: message, lastMessagee });
    }
  );

  getAllMessages = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { chatId } = req.params;
      const id = (req as any).loggedUser._id; // logged user
      const checkChats = await this.chatService.findChatsByChatId(chatId);
      if (checkChats.length === 0) {
        return next(new BadRequestError("chat id not found"));
      }
      const messages = await this.messageService.getChatMessages(chatId, id);
      res.status(HttpStatusCode.OK).json({ success: true, data: messages });
    }
  );

  updateMessage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;
      const loggedUser_id = (req as any).loggedUser._id; // logged user
      const { body, image } = req.body;
      const message = await this.messageService.updateMessage(
        id,
        loggedUser_id,
        { body, image }
      );

      if (!message) {
        return next(new NotFoundError("message not found"));
      }
      res.status(HttpStatusCode.OK).json({ success: true, data: message });
    }
  );

  // ^ Delete messages by IDs
  deleteMessage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.body;
      const loggedUser_id = (req as any).loggedUser._id; // logged user
      const deletedMessages = await this.messageService.deleteMessages(
        id,
        loggedUser_id
      );

      if (deletedMessages.deletedCount === 0) {
        return next(new NotFoundError("Messages not found"));
      }
      res.status(HttpStatusCode.NO_CONTENT).end();
    }
  );
}
