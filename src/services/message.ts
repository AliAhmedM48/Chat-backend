import asyncHandler from "express-async-handler";
import BadRequestError from "../errors/badRequestError";
import Chat from "../models/chat";
import Message from "../models/message";
import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";

import { Request, Response, NextFunction } from "express";
import MessageMongoRepository from "../repositories/mongoDB/message";
import mongoose from "mongoose";

export default class MessageService {

  constructor(private repository: MessageMongoRepository) { }

  createMessage = async (loggedUser_id: string, body: string, seenIds: string[], image: string, chatId: string) => {
    return await this.repository.create(loggedUser_id, chatId, body, seenIds, image);
  }

  getChatMessages =
    async (chatId: string, loggedUser_id: any) => {
      const messages = await this.repository.findAllByChatId(chatId);

      // Update the seenIds array for each message
      for (const message of messages) {
        if (!message.seenIds.includes(loggedUser_id)) {
          await this.repository.updateSeenIds(message, loggedUser_id);
          await this.repository.saveChanges(message);
        }
      }
      return messages;
    }

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

