<<<<<<< Updated upstream
=======
import { Server } from "socket.io";

import { ioHandleAuthenticateSocket, ioHandleDisconnect, ioHandleError, ioHandleNewMessage, socketEvents } from "../sockets";
import Message from "../models/message";

const connectToSocket = (server: any) => {

    const io = new Server(server);

    // * Apply authentication middleware to Socket.IO connection
    io.use(ioHandleAuthenticateSocket);


    io.on(socketEvents.connection, (socket) => {

        const clientId = socket.id;
        console.log('A user connected', { clientId });

        // * Handle new message event
        ioHandleNewMessage(io, socket, Message);

        // * Handle user disconnection
        ioHandleDisconnect(socket);

        // * Error handling for Socket.IO events
        ioHandleError(socket);
    });

}

export default connectToSocket;
>>>>>>> Stashed changes
