import express, { Request, Response } from "express";
import dotenv from "dotenv";
import chatRoute from "./src/routes/chat.route";
import mongoose from "mongoose";

// import morgan from "morgan";

// configures dotenv to work in your application
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

mongoose
  .connect(`${process.env.DB_HOST_MONGO}`, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("connected");
  });

app.use("/chats", chatRoute);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
