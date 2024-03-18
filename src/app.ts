// * Global dependencies
//#region 
import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
//#endregion

// * Project dependencies
//#region 
import userRoute from "./routes/user";
import messageRoute from "./routes/message";
import chatRoute from "./routes/chat";
import { connectToMongoDB } from "./connections/connectToMongoDB";
import authRoute from "./routes/auth";
import errorHandler from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";
//#endregion

// * configures dotenv to work in the application
dotenv.config();

// * Express initialization
const app: Application = express();

// * Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); // By default, this will allow all origins, all methods, and all headers
// Example configuration to allow only specific origins
// app.use(cors({
//   origin: 'http://example.com' // Allow requests from http://example.com
// }));

// * Routes
const apiV1 = '/api/v1';
app.use(apiV1 + "/users", userRoute);
app.use(apiV1 + "/messages", messageRoute);
app.use(apiV1 + "/chats", chatRoute);
app.use(apiV1 + "/auth", authRoute);
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError('Not found page 404'));
})

// * Error handling
app.use(errorHandler);

// * connecting to Mongodb
connectToMongoDB(`${process.env.DB_HOST_MONGO}`);

export { app };
