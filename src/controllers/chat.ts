import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import Chat from "../models/chat";
import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";
import ChatService from "../services/chat";

interface IChatController {
  createChat(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllChats(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateChat(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteChat(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default class ChatController implements IChatController {

  constructor(private service: ChatService) { }

  createGroup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let { name, lastMessage } = req.body;
      let users = (req as any).users; // from creation validation middleware

      const chat = await this.service.createGroup(users, name, lastMessage)
      res.status(HttpStatusCode.CREATED).json({ message: "create OK", chat });
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  getAllChats = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

      let id = req.params.id;

      // logged user   
      if (!id) { id = (req as any).loggedUser._id; }
      let chats = await this.service.findChatsByChatId(id);

      if (chats.length === 0) {
        chats = await this.service.findChatsByUserId(id);
      }
      res.status(200).send(chats);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  updateChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const chat = await this.service.updateChat(id, req.body);
      if (!chat) { return next(new NotFoundError("chat not found")); }
      res.status(HttpStatusCode.OK).send(chat);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  // !!!!!!!!!!!!!!!
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
      );
      console.log("User removed from chat successfully.");

      if (!chat) {
        return next(new NotFoundError("chat not found"));
      }
      res.status(200).send(`this chat ${chat} has been deleted`);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
