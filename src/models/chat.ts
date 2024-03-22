import { Schema, model, Types } from "mongoose";

// ^ Interface
interface IChat {
  name: string;
  users: Array<Types.ObjectId>;
  lastMessage: string;
  // ! ++++++++++++++++++++++++++++
  isGroup: boolean;
}
const atLeastOneUserValidator = (value: Types.ObjectId[]) => {
  return value.length > 0;
};

// ^ Schema
const chatSchema = new Schema<IChat>(
  {
    // ! ++++++++++++++++++++++++++++
    name: {
      type: String,
      default: "USE_RECEIVER_NAME"
      // required: [true, "Name is required"],
    },
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      validate: [atLeastOneUserValidator, "At least one user is required"], // Use the custom validator
    },
    lastMessage: {
      type: String,
      default: "",
      // ! during development
      // required: [true, "Last Message is Required"],
    },
    isGroup: {
      type: Boolean,
      default: false,
      // required: [true, "isGroup is Required"],
    },
  },
  { timestamps: true }
);

// ^ Model
const Chat = model<IChat>("Chat", chatSchema, "chats");
export default Chat;