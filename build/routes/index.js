"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiV1 = void 0;
const auth_1 = __importDefault(require("../repositories/mongoDB/auth"));
const auth_2 = __importDefault(require("../services/auth"));
const auth_3 = __importDefault(require("../controllers/auth"));
const auth_4 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("../repositories/mongoDB/users"));
const users_2 = __importDefault(require("../services/users"));
const user_1 = __importDefault(require("../controllers/user"));
const user_2 = __importDefault(require("./user"));
const message_1 = __importDefault(require("../repositories/mongoDB/message"));
const message_2 = __importDefault(require("../services/message"));
const message_3 = __importDefault(require("../controllers/message"));
const message_4 = __importDefault(require("./message"));
const chat_1 = __importDefault(require("../repositories/mongoDB/chat"));
const chat_2 = __importDefault(require("../services/chat"));
const chat_3 = __importDefault(require("../controllers/chat"));
const chat_4 = __importDefault(require("./chat"));
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const express_1 = __importDefault(require("express"));
const apiV1 = express_1.default.Router();
exports.apiV1 = apiV1;
// * auth
const authRepository = new auth_1.default();
const authService = new auth_2.default(authRepository);
const authController = new auth_3.default(authService);
// * Users
const userRepository = new users_1.default();
const userService = new users_2.default(userRepository);
const userController = new user_1.default(userService);
// * Chats
const chatRepository = new chat_1.default();
const chatService = new chat_2.default(chatRepository);
const chatController = new chat_3.default(chatService);
// * Messages
const messageRepository = new message_1.default();
const messageService = new message_2.default(messageRepository);
const messageController = new message_3.default(messageService, chatService);
// * Routes
apiV1.use("/auth", (0, auth_4.default)(authController));
apiV1.use("/users", authenticateUser_1.default, (0, user_2.default)(userController));
apiV1.use("/chats", authenticateUser_1.default, (0, chat_4.default)(chatController));
apiV1.use("/messages", authenticateUser_1.default, (0, message_4.default)(messageController));
