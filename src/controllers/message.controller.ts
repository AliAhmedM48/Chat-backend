import { Request, Response, NextFunction } from "express";
import { Message } from "../models/message.model";
import { Chat } from "../models/chat.model";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/api.error";

export class MessageController {
  createMessage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { senderId, chatId, body, users, name } = req.body;
      let message;
      if (!chatId) {
        const newChat = await Chat.create({ users, name });

        message = await Message.create({
          senderId,
          chatId: newChat._id,
          body,
        });
      } else {
        message = await Message.create({ senderId, chatId, body });
      }
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        { lastMessage: body },
        { new: true }
      );

      if (!chat) {
        return next(new ApiError("chat not found", 404));
      }

      res
        .status(201)
        .json({ success: true, data: message, lastMessage: chat?.lastMessage });
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
