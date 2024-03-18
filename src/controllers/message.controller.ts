import { Request, Response, NextFunction } from "express";
import { Message } from "../models/message.model";
import { Chat } from "../models/chat.model";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/api.error";

export class MessageController {
  createMessage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { senderId, receiverId, body } = req.body;
      let isChat;
      let chat;
      let chatId;

      isChat = await Chat.find({
        $and: [{ isGroup: false }, { users: { $all: [senderId, receiverId] } }],
      });

      if (isChat.length === 0) {
        chat = await Chat.create({
          name: "chat",
          users: [senderId, receiverId],
          isGroup: false,
        });

        chatId = chat._id;
      } else {
        chatId = isChat[0]._id;
      }

      const message = await Message.create({
        senderId: senderId,
        chatId: chatId,
        body: body,
      });
      res.status(201).json({ success: true, data: message });
    }
  );

  createMessagesInGroup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { senderId, chatId, body } = req.body;
      const message = await Message.create({
        senderId: senderId,
        chatId: chatId,
        body: body,
      });
      res.status(201).json({ success: true, data: message });
    }
  );

  getAllMessages = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;

      let messages = await Message.find({ chatId: id });

      if (messages.length === 0 || !messages) {
        return next(new ApiError("Messages not found", 404));
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
        return next(new ApiError("message not found", 404));
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
        return next(new ApiError("messages not found", 404));
      }
      res.status(200).json({ success: true, data: deletedMessages });
    }
  );
}
