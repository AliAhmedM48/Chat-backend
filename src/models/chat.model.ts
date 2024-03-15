import { Schema, model, Types } from 'mongoose';

// ^ Interface
interface IChat {
    name: string,
    users: Array<Types.ObjectId>
    lastMessage: Types.ObjectId
};

// ^ Schema
const chatSchema = new Schema<IChat>({
    name: { type: String, required: [true, 'Name is required'] }, // group name or username
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Users is Required'] }],
    lastMessage: { type: Schema.ObjectId, ref: 'Message', required: [true, 'Last Message is Required'] }
}, { timestamps: true });

// ^ Model
const Chat = model<IChat>('Chat', chatSchema, 'chats');