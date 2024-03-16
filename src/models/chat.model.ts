import { Schema, model, Types } from "mongoose";

// ^ Interface
interface IChat {
  name: string;
  users: Array<Types.ObjectId>;
  lastMessage: Types.ObjectId;
}
const atLeastOneUserValidator = (value: Types.ObjectId[]) => {
  return value.length > 0;
};

// ^ Schema
const chatSchema = new Schema<IChat>(
  {
    name: { type: String, required: [true, "Name is required"] }, // group name or username
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      validate: [atLeastOneUserValidator, "At least one user is required"], // Use the custom validator
    },
    lastMessage: {
      type: Schema.ObjectId,
      ref: "Message",
      required: [true, "Last Message is Required"],
    },
  },
  { timestamps: true }
);

// ^ Model
export const Chat = model<IChat>("Chat", chatSchema, "chats");
