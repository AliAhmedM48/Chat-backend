import asyncHandler from "express-async-handler";
import Message from "../models/message";
import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";

import { Request, Response, NextFunction } from "express";
import MessageMongoRepository from "../repositories/mongoDB/message";

export default class MessageService {

  constructor(private repository: MessageMongoRepository) { }

  createMessage = async (loggedUser_id: string, body: string, seenIds: string[], image: string, chatId: string) => {
    return await this.repository.create(loggedUser_id, chatId, body, seenIds, image);
  }

  getChatMessages = async (chatId: string, loggedUser_id: any) => {
    const messages = await this.repository.findAllByChatId(chatId);

    // Update the seenIds array for each message
    for (const message of messages) {
      if (!message.seenIds.includes(loggedUser_id)) {
        await this.repository.updateSeenIds(message, loggedUser_id);
      }
    }
    return messages;
  }

  updateMessage = async (messageId: string, loggedUser_id: string, update: { body?: string, image?: string }) => {
    return await this.repository.update(messageId, loggedUser_id, update);
  }

  // ^ Delete messages by IDs
  deleteMessages = async (messageId: string | string[], loggedUser_id: string) => {
    const id = messageId;
    const idsToDelete = Array.isArray(id) ? id : [id];
    return await this.repository.deleteMany(idsToDelete, loggedUser_id);
  }
}

