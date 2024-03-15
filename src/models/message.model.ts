import { Schema, model } from 'mongoose';

// ^ Interface
interface IMessage {
    senderId: string,
    chatId: string,
    body: string
};

// ^ Schema
const messageSchema = new Schema<IMessage>({
    senderId: { type: String, required: [true, 'Sender Id is Required'] },
    chatId: { type: String, required: [true, 'Chat Id is Required'] },
    body: { type: String, required: [true, 'Body is Required'] }
}, { timestamps: true });

// ^ Model
const Message = model<IMessage>('Message', messageSchema, 'messages');