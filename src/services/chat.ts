import ChatMongoRepository from "../repositories/mongoDB/chat";

// interface IChatController {
//   createGroup(req: Request, res: Response, next: NextFunction): Promise<void>;
//   getByUserIdOrByChatId(req: Request, res: Response, next: NextFunction): Promise<void>;
//   updateChat(req: Request, res: Response, next: NextFunction): Promise<void>;
//   deleteChat(req: Request, res: Response, next: NextFunction): Promise<void>;
// }

export default class ChatService {
  constructor(private repository: ChatMongoRepository) { }

  createGroup = async (users: string[], name?: string, lastMessage?: string) => {
    return await this.repository.create(users, true, name!, lastMessage);
  }

  createPrivateChat = async (loggedUser_id?: string, receiverId?: string, name?: string, lastMessage?: string) => {
    const existingChat = await this.repository.findDirectChatBetweenUsers(loggedUser_id!, receiverId!);
    if (!existingChat) {
      return await this.repository.create([loggedUser_id!, receiverId!], false, name!, lastMessage);
    }
    return existingChat;
  }

  getPreviousChat = async (loggedUser_id: string, receiverId: string) => {
    return await this.repository.findDirectChatBetweenUsers(loggedUser_id, receiverId);
  }

  findChatByIdAndUser = async (chatId: string, loggedUser_id: string) => {
    return await this.repository.findChatByIdAndUser(chatId, loggedUser_id);
  }

  findChatsByChatId = async (chatId: string) => {
    return this.repository.findByChatId(chatId);
  }

  findChatsByUserId = async (userId: string) => {
    return this.repository.findByUserId(userId);
  }

  updateLastMessage = async (chatId: string, lastMessage: string) => {
    return await this.repository.update(chatId, { lastMessage });
  }

  updateChat = async (chatId: string, update: { users?: string[], name?: string, isGroup?: boolean, lastMessage?: string }) => {
    return await this.repository.update(chatId, update);
  }

  leaveChat = async (loggedUser_id: string, chatId: string) => {
    return await this.repository.deleteUser(loggedUser_id, chatId);
  }
}