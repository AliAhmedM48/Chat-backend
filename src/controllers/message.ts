import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { NotFoundError } from "../errors/notFoundError";
import BadRequestError from "../errors/badRequestError";
import { UnauthorizedError } from "../errors/unauthorizedError";
import { HttpStatusCode } from "../errors/httpStatusCode";

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
        return next(new BadRequestError("send chatId or receiverId"));
      }
      // * CHECK Chat ID /////// check if chat id is provided
      if (!chatId) {
        // ! FIRST CASE /////// private chat /////// in case client start new chat from users list
        //#region
        const existingChat = await Chat.findOne({
          $and: [
            { isGroup: false },
            { users: { $all: [id, receiverId] } },
          ],
        });

        chatId = existingChat
          ? existingChat._id
          : (await Chat.create({ users: [id, receiverId] }))._id;
        //#endregion
      }

      // ! SECOND CASE /////// create group /////OR///// choose chat from chat list [chat / group]
      // ^ check by [chat id , user id] if user is [not] already in chat/group
      const existingChat = await Chat.findOne({
        _id: chatId,
        users: { $in: [id] },
      });

      if (!existingChat) {
        next(new UnauthorizedError("You are not in the chat"));
      }

      const message = await Message.create({ senderId: id, chatId, body, seenIds: id, image });

      const lastMessage = (
        await Chat.findByIdAndUpdate(chatId,
          { lastMessage: message.body },
          { new: true }
        )
      )?.lastMessage;

      res.status(HttpStatusCode.CREATED)
        .json({ success: true, data: message, lastMessage });
    }
  );

  getAllMessages = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { chatId } = req.params;
      const { loggedUser } = (req as any); // logged user

      const checkChats = await Chat.findById(chatId);
      if (!checkChats) { return next(new BadRequestError('chat id not found')); }

      let messages = await Message.find({ chatId: chatId });

      // Update the seenIds array for each message
      for (const message of messages) {
        if (!message.seenIds.includes(loggedUser._id)) {
          // Add the logged in user's ID to the seenIds array if not already present
          message.seenIds.push(loggedUser._id);
          // Save the updated message to the database
          await message.save();
        }
      }

      res.status(HttpStatusCode.OK).json({ success: true, data: messages });
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
        // ! CHECK user id
        _id: { $in: idsToDelete },
      });

      if (deletedMessages.deletedCount === 0) {
        return next(new NotFoundError("Messages not found"));
      }
      res.status(HttpStatusCode.OK).json({ success: true, data: deletedMessages });
    }
  );
}