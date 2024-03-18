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
const apiV1 = express.Router();
app.use("/api/v1", apiV1);

apiV1.use("/users", userRoute);
apiV1.use("/messages", messageRoute);
apiV1.use("/chats", chatRoute);
apiV1.use("/auth", authRoute);

apiV1.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Invalid api"));
});

// * Error handling
app.use(errorHandler);

// * connecting to Mongodb
connectToMongoDB(`${process.env.DB_HOST_MONGO}`);

export { app };
