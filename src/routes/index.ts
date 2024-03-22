import AuthMongoRepository from "../repositories/mongoDB/auth";
import AuthService from "../services/auth";
import AuthController from "../controllers/auth";
import authRoutes from "./auth";

import UserMongoRepository from "../repositories/mongoDB/users";
import UserService from "../services/users";
import UserController from "../controllers/user";
import userRoutes from "./user";

import MessageMongoRepository from "../repositories/mongoDB/message";
import MessageService from "../services/message";
import MessageController from "../controllers/message";
import messageRoutes from "./message";

import ChatMongoRepository from "../repositories/mongoDB/chat";
import ChatService from "../services/chat";
import ChatController from "../controllers/chat";
import chatRoutes from "./chat";

import checkUserAuthentication from "../middlewares/authenticateUser";

import express from "express";

const apiV1 = express.Router();

// * auth
const authRepository = new AuthMongoRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// * Users
const userRepository = new UserMongoRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// * Chats
const chatRepository = new ChatMongoRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

// * Messages
const messageRepository = new MessageMongoRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService, chatService);

// * Routes
apiV1.use("/auth", authRoutes(authController));
apiV1.use("/users", checkUserAuthentication, userRoutes(userController));
apiV1.use("/chats", checkUserAuthentication, chatRoutes(chatController));
apiV1.use("/messages", checkUserAuthentication, messageRoutes(messageController));

export { apiV1 }