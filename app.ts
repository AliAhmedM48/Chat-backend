import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import userRoute from './src/routes/user.route';
import mongoose from "mongoose";
import messageRoute from "./src/routes/message.route";
// import morgan from "morgan";

// configures dotenv to work in your application
dotenv.config();
const app: Application = express();
app.use(express.json());
const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

app.use('/', userRoute);
app.use('/', messageRoute);

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});

mongoose.connect(`${process.env.DB_HOST_MONGO}`, { dbName: process.env.DB_NAME })
    .then(() => {
        console.log("Connected to MongoDB", process.env.PORT);
    })