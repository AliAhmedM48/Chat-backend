import { Schema, model, Types } from "mongoose";

// ^ Interface
interface IChat {
  name: string;
  users: Array<Types.ObjectId>;
  lastMessage: string;
  isGroup: boolean;
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
  },
  { timestamps: true }
);

// ^ Model
export const Chat = model<IChat>("Chat", chatSchema, "chats");
