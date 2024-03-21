"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioHandleAuthenticateSocket = exports.ioHandleError = exports.ioHandleDisconnect = exports.ioHandleNewMessage = exports.socketEvents = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.socketEvents = {
    //#region 
    connection: 'connection',
    disconnect: 'disconnect',
    new_message: 'messages'
    //#endregion
};
const ioHandleNewMessage = (io, socket, Message) => {
    //#region 
    socket.on(exports.socketEvents.new_message, (0, express_async_handler_1.default)((data) => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = yield Message.create(data);
        io.emit(exports.socketEvents.new_message, data);
    })));
    //#endregion
};
exports.ioHandleNewMessage = ioHandleNewMessage;
const ioHandleDisconnect = (socket) => {
    //#region 
    socket.on(exports.socketEvents.disconnect, (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });
    //#endregion
};
exports.ioHandleDisconnect = ioHandleDisconnect;
const ioHandleError = (socket) => {
    //#region 
    socket.on('error', (errorMessage) => {
        console.error('Socket error:', errorMessage);
        return new Error(`Socket.io Error ${errorMessage}`);
    });
    //#endregion
};
exports.ioHandleError = ioHandleError;
const ioHandleAuthenticateSocket = (socket, next) => {
    // const { token } = socket.handshake.auth;
    // Verify token and authenticate user
    // if (isValidToken(token)) {
    return next();
    // } else {
    // return next(new Error('Authentication failed'));
    // }
};
exports.ioHandleAuthenticateSocket = ioHandleAuthenticateSocket;
