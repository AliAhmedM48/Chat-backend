"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// * Global dependencies
//#region
const node_path_1 = require("node:path");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
//#endregion
// * Project dependencies
//#region
const user_1 = __importDefault(require("./routes/user"));
const message_1 = __importDefault(require("./routes/message"));
const chat_1 = __importDefault(require("./routes/chat"));
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const initServer_1 = require("./connections/initServer");
const notFoundError_1 = require("./errors/notFoundError");
const authenticateUser_1 = require("./middlewares/authenticateUser");
const swagger_config_1 = require("./swagger.config");
//#endregion
// * configures dotenv to work in the application
dotenv_1.default.config();
// * Express initialization
const app = (0, express_1.default)();
const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_config_1.swaggerOptions);
// * Middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)()); // By default, this will allow all origins, all methods, and all headers
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// * Routes
const apiV1 = express_1.default.Router();
app.use("/api/v1", apiV1);
apiV1.use("/auth", auth_1.default);
apiV1.use("/users", authenticateUser_1.checkUserAuthentication, user_1.default);
apiV1.use("/messages", authenticateUser_1.checkUserAuthentication, message_1.default);
apiV1.use("/chats", authenticateUser_1.checkUserAuthentication, chat_1.default);
app.get('/io', (req, res) => {
    const filePath = (0, node_path_1.join)(__dirname, '..', 'public', 'index.html');
    res.sendFile(filePath);
});
apiV1.all("*", authenticateUser_1.checkUserAuthentication, (req, res, next) => {
    next(new notFoundError_1.NotFoundError("Invalid api"));
});
// * Error handling
app.use(errorHandler_1.default);
// * Server initialization
(0, initServer_1.initServer)(app);
