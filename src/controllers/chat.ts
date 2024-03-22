import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
<<<<<<< Updated upstream
import { NotFoundError } from "../errors/notFoundError";
=======

import Chat from "../models/chat";
import HttpStatusCode from "../errors/httpStatusCode";
import NotFoundError from "../errors/notFoundError";
import ChatService from "../services/chat";
>>>>>>> Stashed changes

interface IChatController {
  createChat(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllChats(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateChat(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteChat(req: Request, res: Response, next: NextFunction): Promise<void>;
}

<<<<<<< Updated upstream
class ChatController implements IChatController {
  createChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, users, lastMessage, isGroup } = req.body;

      const chat = await Chat.create({ name, users, lastMessage, isGroup });
      res.status(201).json({
        message: "create OK",
        chat,
      });
=======
export default class ChatController implements IChatController {

  constructor(private service: ChatService) { }

  createGroup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let { name, lastMessage } = req.body;
      let users = (req as any).users; // from creation validation middleware

      const chat = await this.service.createGroup(users, name, lastMessage)
      res.status(HttpStatusCode.CREATED).json({ message: "create OK", chat });
>>>>>>> Stashed changes
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  getAllChats = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
<<<<<<< Updated upstream
      const { id } = req.params;
      let chats = await Chat.find({ _id: id });
      if (chats.length === 0) {
        chats = await Chat.find({ users: id });
=======

      let id = req.params.id;

      // logged user   
      if (!id) { id = (req as any).loggedUser._id; }
      let chats = await this.service.findChatsByChatId(id);

      if (chats.length === 0) {
        chats = await this.service.findChatsByUserId(id);
>>>>>>> Stashed changes
      }
      res.status(200).send(chats);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  updateChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
<<<<<<< Updated upstream
      const chat = await Chat.findByIdAndUpdate(id, req.body, { new: true });
      if (!chat) {
        return next(new NotFoundError("chat not found"));
      }
      res.status(200).send(chat);
=======
      const chat = await this.service.updateChat(id, req.body);
      if (!chat) { return next(new NotFoundError("chat not found")); }
      res.status(HttpStatusCode.OK).send(chat);
>>>>>>> Stashed changes
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;

  // !!!!!!!!!!!!!!!
  deleteChat = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId, chatId } = req.body;
      // const { id } = req.params;
      // const chat = await Chat.findByIdAndDelete(id);
<<<<<<< Updated upstream
      const chat = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId }
      }, { new: true });
      console.log('User removed from chat successfully.');

=======
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
      );
      console.log("User removed from chat successfully.");
>>>>>>> Stashed changes

      if (!chat) {
        return next(new NotFoundError("chat not found"));
      }
      res.status(200).send(`this chat ${chat} has been deleted`);
    }
  ) as (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
