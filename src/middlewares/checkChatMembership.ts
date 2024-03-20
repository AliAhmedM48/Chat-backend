// * verify whether a user is a member of the chat before allowing them to perform certain actions on it
import { NextFunction, Request, Response } from "express";
import { Chat } from "../models/chat";
import { UnauthorizedError } from "../errors/unauthorizedError";
import asyncHandler from "express-async-handler";

export const checkChatMembership = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let { senderId, chatId } = req.body;

    const existingChat = await Chat.findOne({
      _id: chatId,
      users: { $in: [senderId] },
    });
    if (!existingChat) {
      next(new UnauthorizedError("You are not in the chat"));
    }
  }
);
