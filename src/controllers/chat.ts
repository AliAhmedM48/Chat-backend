import { Request, Response, NextFunction } from "express";
import { Chat } from "../models/chat";
import asyncHandler from "express-async-handler";
import { NotFoundError } from "../errors/notFoundError";

interface IChatController {
  createChat(req: Request, res: Response, next: NextFunction): Promise<void>;
  getByUserIdOrByChatId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  updateChat(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteChat(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class ChatController implements IChatController {
  createChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, users, lastMessage, isGroup } = req.body;

      const chat = await Chat.create({ name, users, lastMessage, isGroup });

      res.status(201).json({
        message: "create OK",
        chat,
      });
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  getByUserIdOrByChatId = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      let chats = await Chat.find({ _id: id }).populate("users");
      if (chats.length === 0) {
        chats = await Chat.find({ users: id }).populate("users");
      }
      res.status(200).send(chats);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  updateChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const chat = await Chat.findByIdAndUpdate(id, req.body, { new: true });
      if (!chat) {
        return next(new NotFoundError("chat not found"));
      }
      res.status(200).send(chat);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  deleteChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId, chatId } = req.body;
      // const { id } = req.params;
      // const chat = await Chat.findByIdAndDelete(id);
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        { new: true }
      );
      console.log("User removed from chat successfully.");

      if (!chat) {
        return next(new NotFoundError("chat not found"));
      }
      res.status(200).send(`this chat ${chat} has been deleted`);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export default ChatController;
