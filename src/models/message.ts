import { Schema, model, Types } from "mongoose";

// ^ Interface
export interface IMessage {
  senderId: Schema.Types.ObjectId,
  chatId: Schema.Types.ObjectId,
  body: string,
  seenIds: Array<Types.ObjectId>,
  image: string
};

// ^ Schema
const messageSchema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Sender Id is Required'] },
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: [true, 'Chat Id is Required'] },
  seenIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  body: String,
  image: String,

}, { timestamps: true });

// ^ Model
export const Message = model<IMessage>('Message', messageSchema, 'messages');