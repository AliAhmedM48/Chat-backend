import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import Message from "../../models/message";
import HttpStatusCode from "../../errors/httpStatusCode";
import NotFoundError from "../../errors/notFoundError";

export default class MessageMongoRepository {

  create = async (senderId: string, chatId: string, body: string, seenIds: string[], image: string) => {
    return await Message.create({ senderId, chatId, body, seenIds, image });
  }

  findAllByChatId = async (chatId: string) => {
    return await Message.find({ chatId: chatId });
  }

  updateSeenIds = async (message: any, loggedUser_id: any) => {
    message.seenIds.push(loggedUser_id);
    message.save();
  }

  update = async (messageId: string, loggedUser_id: string, update: { body?: string, image?: string }) => {
    return await Message.findOneAndUpdate({ _id: messageId, senderId: loggedUser_id }, update, { new: true });
  }

  deleteMany = async (messageIds: string[], loggedUser_id: string) => {
    return await Message.deleteMany({ _id: { $in: messageIds }, senderId: loggedUser_id })
  }

  deleteOne = async (messageId: string, loggedUser_id: string) => {
    return await Message.findOneAndDelete({ _id: messageId, senderId: loggedUser_id });
  }
}
