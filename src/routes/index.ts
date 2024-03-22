import AuthMongoRepository from "../repositories/mongoDB/auth";
import AuthService from "../services/auth";
import AuthController from "../controllers/auth";
import AuthRoutes from "./auth";

import UserMongoRepository from "../repositories/mongoDB/users";
import UserService from "../services/users";
import UserController from "../controllers/user";
import UserRoutes from "./user";

import MessageMongoRepository from "../repositories/mongoDB/message";
import MessageService from "../services/message";
import MessageController from "../controllers/message";
import MessageRoutes from "./message";

import ChatMongoRepository from "../repositories/mongoDB/chat";
import ChatService from "../services/chat";
import ChatController from "../controllers/chat";
import ChatRoutes from "./chat";

import checkUserAuthentication from "../middlewares/authenticateUser";
import express from "express";

const apiV1 = express.Router();

// * auth
const authRepository = new AuthMongoRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
const authRoute = new AuthRoutes(authController);

// * Users
const userRepository = new UserMongoRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRoute = new UserRoutes(userController);

// * Chats
const chatRepository = new ChatMongoRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);
const chatRoute = new ChatRoutes(chatController);

// * Messages
const messageRepository = new MessageMongoRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService, chatService);
const messageRoute = new MessageRoutes(messageController);

// * Routes
apiV1.use("/auth", authRoute.expressrRouter);
apiV1.use("/users", checkUserAuthentication, userRoute.expressrRouter);
apiV1.use("/messages", checkUserAuthentication, messageRoute.expressrRouter);
apiV1.use("/chats", checkUserAuthentication, chatRoute.expressrRouter);

export { apiV1 }