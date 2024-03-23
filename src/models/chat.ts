import { Schema, model, Types } from "mongoose";

// ^ Interface
interface IChat {
  name: string;
  users: Array<Types.ObjectId>;
  lastMessage: string;
  isGroup: boolean;
  isEmpty: boolean;
}
const atLeastOneUserValidator = (value: Types.ObjectId[]) => {
  return value.length > 0;
};

// ^ Schema
const chatSchema = new Schema<IChat>(
  {
    name: { type: String, default: "USE_RECEIVER_NAME" },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: String, default: "" },
    isGroup: { type: Boolean, default: false },
    isEmpty: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ^ Model
const Chat = model<IChat>("Chat", chatSchema, "chats");
export default Chat;
