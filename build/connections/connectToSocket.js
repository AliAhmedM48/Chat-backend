"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const sockets_1 = require("../sockets");
const message_1 = __importDefault(require("../models/message"));
const connectToSocket = (server) => {
    const io = new socket_io_1.Server(server);
    // * Apply authentication middleware to Socket.IO connection
    io.use(sockets_1.ioHandleAuthenticateSocket);
    io.on(sockets_1.socketEvents.connection, (socket) => {
        const clientId = socket.id;
        console.log('A user connected', { clientId });
        // * Handle new message event
        (0, sockets_1.ioHandleNewMessage)(io, socket, message_1.default);
        // * Handle user disconnection
        (0, sockets_1.ioHandleDisconnect)(socket);
        // * Error handling for Socket.IO events
        (0, sockets_1.ioHandleError)(socket);
    });
};
exports.default = connectToSocket;
