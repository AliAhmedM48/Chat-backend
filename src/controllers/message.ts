import { Request, Response, NextFunction } from "express";
import { Message } from "../models/message";
import { Chat } from "../models/chat";
import asyncHandler from "express-async-handler";
import { NotFoundError } from "../errors/notFoundError";

export class MessageController {
  createMessage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let { senderId, receiverId, body, chatId } = req.body;

      if (!(receiverId || chatId)) {
        res.status(401).json({ message: "Send chatId or receiverId" });
        return;
      }

      // * CHECK Chat ID /////// check if chat id is provided
      if (!chatId) {
        // ! FIRST CASE /////// private chat /////// in case client start new chat from users list
        //#region 
        const existingChat = await Chat.findOne({ $and: [{ isGroup: false }, { users: { $all: [senderId, receiverId] } }] });
        chatId = existingChat ? existingChat._id : (await Chat.create({ users: [senderId, receiverId] }))._id
        //#endregion
      }

      // ! SECOND CASE /////// create group /////OR///// choose chat from chat list [chat / group]
      // ^ check by [chat id , user id] if user is [not] already in chat/group
      const existingChat = await Chat.findOne({ _id: chatId, users: { $in: [senderId] } });
      if (!existingChat) {
        res.status(401).json({ message: "Unauthorized: You are not in the chat" });
        return;
      }

      const message = await Message.create({ senderId, chatId, body });
      res.status(201).json({ success: true, data: message });
    }
  );

  // createMessagesInGroup = asyncHandler(
  //   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //     const { senderId, chatId, body } = req.body;
  //     const message = await Message.create({
  //       senderId: senderId,
  //       chatId: chatId,
  //       body: body,
  //     });
  //     res.status(201).json({ success: true, data: message });
  //   }
  // );

  getAllMessages = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;

      let messages = await Message.find({ chatId: id });

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
