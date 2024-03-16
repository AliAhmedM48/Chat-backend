"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./src/routes/user.route"));
const mongoose_1 = __importDefault(require("mongoose"));
const message_route_1 = __importDefault(require("./src/routes/message.route"));
// import morgan from "morgan";
// configures dotenv to work in your application
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT;
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
app.use('/', user_route_1.default);
app.use('/', message_route_1.default);
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
mongoose_1.default.connect(`${process.env.DB_HOST_MONGO}`, { dbName: process.env.DB_NAME })
    .then(() => {
    console.log("Connected to MongoDB", process.env.PORT);
});
