"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
// * Global dependencies
//#region
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const pusher_1 = __importDefault(require("pusher"));
//#endregion
// * Project dependencies
//#region
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const routes_1 = require("./routes");
const swagger_config_1 = __importDefault(require("./swagger.config"));
const authenticateUser_1 = __importDefault(require("./middlewares/authenticateUser"));
const notFoundError_1 = __importDefault(require("./errors/notFoundError"));
const initServer_1 = __importDefault(require("./connections/initServer"));
//#endregion
// * configures dotenv to work in the application
dotenv_1.default.config();
// * Express initialization
const app = (0, express_1.default)();
const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_config_1.default);
// * Middlewares
// TODO: Helmet Package
// app.use(helmet());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)()); // By default, this will allow all origins, all methods, and all headers
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// * Routes
app.use("/api/v1", routes_1.apiV1);
// import { join } from "node:path";
// app.get('/io', (req, res) => {
//     const filePath = join(__dirname, '..', 'public', 'index.html');
//     res.sendFile(filePath);
// });
app.all("*", authenticateUser_1.default, (req, res, next) => {
    next(new notFoundError_1.default("Invalid api"));
});
// * Error handling
app.use(errorHandler_1.default);
exports.pusher = new pusher_1.default({
    appId: `${process.env.PUSHER_APP_ID}`,
    key: `${process.env.PUSHER_APP_KEY}`,
    secret: `${process.env.PUSHER_SECRET}`,
    cluster: "mt1",
    useTLS: true,
});
// * Server initialization
(0, initServer_1.default)(app);
