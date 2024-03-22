import { Schema, model } from 'mongoose';

// ^ Interface
interface IMessage {
  senderId: Schema.Types.ObjectId,
  chatId: Schema.Types.ObjectId,
  body: string
};

// ^ Schema
const messageSchema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Sender Id is Required'] },
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: [true, 'Chat Id is Required'] },
  body: { type: String, required: [true, 'Body is Required'] }
}, { timestamps: true });

// ^ Model
const Message = model<IMessage>('Message', messageSchema, 'messages');
export default Message;