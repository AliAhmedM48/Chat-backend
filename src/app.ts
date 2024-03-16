import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import userRoute from './routes/user.route';
import messageRoute from "./routes/message.route";
import chatRoute from "./routes/chat.route";
import { connectToMongoDB } from "./models";
import morgan from "morgan";
import cors from 'cors';

// * configures dotenv to work in the application
dotenv.config();

// * Create Express Application
const app: Application = express();

// * Enable support for JSON data in the payload
app.use(express.json());
app.use(morgan('dev'));

// * By default, this will allow all origins, all methods, and all headers
app.use(cors());
// Example configuration to allow only specific origins
// app.use(cors({
//   origin: 'http://example.com' // Allow requests from http://example.com
// }));

// * connecting to Mongodb
connectToMongoDB();

app.use('/api/v1/users', userRoute);
app.use('/api/v1/messages', messageRoute);
app.use("/api/v1/chats", chatRoute);

export {
  app
}

