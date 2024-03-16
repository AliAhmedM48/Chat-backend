"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const chat_route_1 = __importDefault(require("./src/routes/chat.route"));
const mongoose_1 = __importDefault(require("mongoose"));
// import morgan from "morgan";
// configures dotenv to work in your application
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT;
mongoose_1.default
    .connect(`${process.env.DB_HOST_MONGO}`, {
    dbName: process.env.DB_NAME,
})
    .then(() => {
    console.log("connected");
});
app.use("/chats", chat_route_1.default);
app
    .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
})
    .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
