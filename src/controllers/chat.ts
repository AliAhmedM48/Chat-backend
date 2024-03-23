import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";
import ChatService from "../services/chat";
import { pusher } from "../app";

// interface IChatController {
//   createGroup(req: Request, res: Response, next: NextFunction): Promise<void>;
//   getByUserIdOrByChatId(req: Request, res: Response, next: NextFunction): Promise<void>;
//   updateChat(req: Request, res: Response, next: NextFunction): Promise<void>;
//   deleteChat(req: Request, res: Response, next: NextFunction): Promise<void>;
// }

export default class ChatController {
  constructor(private service: ChatService) {}

  createGroup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let { name, lastMessage } = req.body;
      let users = (req as any).users; // from creation validation middleware

      const chat = await this.service.createGroup(users, name, lastMessage);

      chat.users.forEach((user) => {
        if (user._id) {
          console.log(user._id);

          pusher.trigger(user._id.toString(), "conversation:new", chat);
        }
      });
      res.status(HttpStatusCode.CREATED).json({ message: "create OK", chat });
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  createChatPrivate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let { receiverId } = req.body;
      let users = (req as any).users;

      let loggedUserId = (req as any).loggedUser._id;
      const chat = await this.service.createPrivateChat(users);

      chat.users.forEach((user) => {
        if (user._id) {
          console.log(user._id);

          pusher.trigger(user._id.toString(), "conversation:new", chat);
        }
      });
      res.status(HttpStatusCode.CREATED).json({ message: "create OK", chat });
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  getByUserIdOrByChatId = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let id = req.params.id;

      // logged user
      if (!id) {
        id = (req as any).loggedUser._id;
      }
      let chats = await this.service.findChatsByChatId(id);

      if (chats.length === 0) {
        chats = await this.service.findChatsByUserId(id);
      }

      chats = chats.filter((chat) => !chat.isEmpty);
      chats.forEach((chat) => console.log(chat.isEmpty));

      res.status(HttpStatusCode.OK).json(chats);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  updateChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const chat = await this.service.updateChat(id, req.body);
      if (!chat) {
        return next(new NotFoundError("chat not found"));
      }
      res.status(HttpStatusCode.OK).send(chat);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  // !!!!!!!!!!!!!!!
  leaveChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { chatId } = req.body;
      const id = (req as any).loggedUser._id; // logged user

      const chat = await this.service.leaveChat(id, chatId);
      if (!chat) {
        return next(new NotFoundError("chat not found"));
      }
      res.status(HttpStatusCode.NO_CONTENT).end();
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
