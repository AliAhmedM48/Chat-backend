import Chat from "../../models/chat";

export default class ChatMongoRepository {
  create = async (
    users: string[],
    isGroup: boolean,
    name: string,
    lastMessage?: string
  ) => {
    return await Chat.create({ name, users, lastMessage, isGroup });
  };

  findByChatId = async (chatId: string) => {
    return await Chat.find({ _id: chatId }).populate("users");
  };

  findByUserId = async (userId: string) => {
    return await Chat.find({ users: userId }).populate("users");
  };

  findDirectChatBetweenUsers = async (
    loggedUser_id: string,
    receiverId: string
  ) => {
    return await Chat.findOne({
      isGroup: false,
      users: { $all: [loggedUser_id, receiverId] },
    });
  };

  findChatByIdAndUser = async (chatId: string, loggedUser_id: string) => {
    return await Chat.findOne({
      _id: chatId,
      users: { $in: [loggedUser_id] },
    });
  };

  findAllByUserId = async (id: string) => {
    return await Chat.find({ users: id }).populate("users");
  };

  update = async (
    chatId: string,
    update: {
      users?: string[];
      name?: string;
      isGroup?: boolean;
      lastMessage?: string;
    }
  ) => {
    return await Chat.findByIdAndUpdate(chatId, update, { new: true }).populate(
      "users"
    );
  };

  deleteUser = async (loggedUser_id: string, chatId: string) => {
    return await Chat.findByIdAndUpdate(chatId, {
      $pull: { users: loggedUser_id },
    });
  };
}
