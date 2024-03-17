import { Request, Response, NextFunction } from "express";
import { Chat } from "../models/chat.model";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/api.error";

interface IChatController {
  createChat(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllChats(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateChat(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteChat(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class ChatController implements IChatController {
  createChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const chat = await Chat.create(req.body);
      res.status(201).json({
        message: "create OK",
        chat,
      });
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  getAllChats = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      let chats = await Chat.find({ _id: id });
      if (chats.length === 0) {
        chats = await Chat.find({ users: id });
      }
      res.status(200).send(chats);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  updateChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const chat = await Chat.findByIdAndUpdate(id, req.body, { new: true });
      if (!chat) {
        return next(new ApiError("chat not found", 404));
      }
      res.status(200).send(chat);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  deleteChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const chat = await Chat.findByIdAndDelete(id);
      if (!chat) {
        return next(new ApiError("chat not found", 404));
      }
      res.status(200).send(`this chat ${chat} has been deleted`);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export default ChatController;
