// * Global dependencies
//#region
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
//#endregion

// * Project dependencies
//#region
import errorHandler from "./middlewares/errorHandler";
import { apiV1 } from "./routes";
import swaggerOptions from "./swagger.config";
import checkUserAuthentication from "./middlewares/authenticateUser";
import NotFoundError from "./errors/notFoundError";
import initServer from "./connections/initServer";
//#endregion

// * configures dotenv to work in the application
dotenv.config();

// * Express initialization
const app: Application = express();

// * Middlewares

// TODO: Helmet Package
// app.use(helmet());

app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); // By default, this will allow all origins, all methods, and all headers
// Example configuration to allow only specific origins
// app.use(cors({
//   origin: 'http://example.com' // Allow requests from http://example.com
// }));

// * Routes
app.use("/api/v1", apiV1);

// import { join } from "node:path";
// app.get('/io', (req, res) => {
//     const filePath = join(__dirname, '..', 'public', 'index.html');
//     res.sendFile(filePath);
// });


app.all("*", checkUserAuthentication, (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError("Invalid api"));
});

// * Error handling
app.use(errorHandler);

// * connecting to Mongodb
connectToMongoDB(`${process.env.DB_HOST_MONGO}`);

export { app };
