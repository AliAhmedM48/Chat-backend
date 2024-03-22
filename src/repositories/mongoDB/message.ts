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
    // Add the logged in user's ID to the seenIds array if not already present
    message.seenIds.push(loggedUser_id);
    // Save the updated message to the database
  }
  saveChanges = async (message: any) => {

    await message.save();
  }


  // update = async (id: string, seenIds: [string], image: string, senderId: string, chatId: string, body: string) => {
  //   return await Message.findByIdAndUpdate(
  //     id, { senderId, chatId, body, image, seenIds },
  //     { new: true }
  //   );
  // }

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
