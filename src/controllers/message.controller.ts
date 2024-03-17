import { Request, Response, NextFunction } from "express";
import { Message } from "../models/message.model";
import { Chat } from "../models/chat.model";

export class MessageController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    //#region
    try {
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

      res
        .status(201)
        .json({ success: true, data: message, lastMessage: chat?.lastMessage });
    } catch (error) {
      next(error);
    }
    //#endregion
  }
  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    //#region
    try {
      const { id } = req.params;

      let messages = await Message.find({ chatId: id });

      if (messages.length === 0 || !messages) {
        res.status(404).json({ message: "Messages not found" });
      }
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      next(error);
    }
    //#endregion
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    //#region
    try {
      const { id } = req.params;
      const { senderId, chatId, body } = req.body;
      const message = await Message.findByIdAndUpdate(
        id,
        { senderId, chatId, body },
        { new: true }
      );
      res.status(200).json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
    //#endregion
  }

  // ^ Delete messages by IDs
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    //#region
    try {
      const { id } = req.body;
      const idsToDelete = Array.isArray(id) ? id : [id];
      const deletedMessages = await Message.deleteMany({
        _id: { $in: idsToDelete },
      });
      res.status(200).json({ success: true, data: deletedMessages });
    } catch (error) {
      next(error);
    }
    //#endregion
  }
}
