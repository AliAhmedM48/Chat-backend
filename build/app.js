"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// * Global dependencies
//#region 
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//#endregion
// * Project dependencies
//#region 
const user_1 = __importDefault(require("./routes/user"));
const message_1 = __importDefault(require("./routes/message"));
const chat_1 = __importDefault(require("./routes/chat"));
const connectToMongoDB_1 = require("./connections/connectToMongoDB");
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const notFoundError_1 = require("./errors/notFoundError");
//#endregion
// * configures dotenv to work in the application
dotenv_1.default.config();
// * Express initialization
const app = (0, express_1.default)();
exports.app = app;
// * Middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)()); // By default, this will allow all origins, all methods, and all headers
// Example configuration to allow only specific origins
// app.use(cors({
//   origin: 'http://example.com' // Allow requests from http://example.com
// }));
// * Routes
const apiV1 = '/api/v1';
app.use(apiV1 + "/users", user_1.default);
app.use(apiV1 + "/messages", message_1.default);
app.use(apiV1 + "/chats", chat_1.default);
app.use(apiV1 + "/auth", auth_1.default);
app.all('*', (req, res, next) => {
    next(new notFoundError_1.NotFoundError('Not found page 404'));
});
// * Error handling
app.use(errorHandler_1.default);
// * connecting to Mongodb
(0, connectToMongoDB_1.connectToMongoDB)(`${process.env.DB_HOST_MONGO}`);
