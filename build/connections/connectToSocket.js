"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToSocket = void 0;
const socket_io_1 = require("socket.io");
const message_1 = require("../models/message");
const sockets_1 = require("../sockets");
const connectToSocket = (server) => {
    const io = new socket_io_1.Server(server);
    // * Apply authentication middleware to Socket.IO connection
    io.use(sockets_1.ioHandleAuthenticateSocket);
    io.on(sockets_1.socketEvents.connection, (socket) => {
        const clientId = socket.id;
        console.log('A user connected', { clientId });
        // * Handle new message event
        (0, sockets_1.ioHandleNewMessage)(io, socket, message_1.Message);
        // * Handle user disconnection
        (0, sockets_1.ioHandleDisconnect)(socket);
        // * Error handling for Socket.IO events
        (0, sockets_1.ioHandleError)(socket);
    });
};
exports.connectToSocket = connectToSocket;
