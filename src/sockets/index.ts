import { Server, Socket } from "socket.io";
import asyncHandler from "express-async-handler";
import { IMessage } from './../models/message';
import { Model } from "mongoose";

export const socketEvents = {
    //#region 
    connection: 'connection',
    disconnect: 'disconnect',
    new_message: 'messages'
    //#endregion
} as const;

export const ioHandleNewMessage = (io: Server, socket: Socket, Message: Model<IMessage>) => {
    //#region 
    socket.on(socketEvents.new_message,
        asyncHandler(
            async (msg: any) => {

                // const newMessage = await Message.create(data);
                if (msg.sender === 'me') {
                    // Handle messages sent by the client with sender 'me'
                    // For example, broadcast to all clients except the sender
                    socket.broadcast.emit(socketEvents.new_message, msg);
                }
                // io.emit(socketEvents.new_message, msg);

            }
        )
    );
    //#endregion
}

export const ioHandleDisconnect = (socket: Socket) => {
    //#region 
    socket.on(socketEvents.disconnect, (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });
    //#endregion
}

export const ioHandleError = (socket: Socket) => {
    //#region 
    socket.on('error', (errorMessage) => {
        console.error('Socket error:', errorMessage);
        return new Error(`Socket.io Error ${errorMessage}`);
    });
    //#endregion
}

export const ioHandleAuthenticateSocket = (socket: Socket, next: any) => {
    // const { token } = socket.handshake.auth;
    // Verify token and authenticate user
    // if (isValidToken(token)) {
    return next();
    // } else {
    // return next(new Error('Authentication failed'));
    // }
};