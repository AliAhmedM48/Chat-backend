// * Global dependencies
//#region
import { join } from "node:path";

import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//#endregion

// * Project dependencies
//#region
import userRoute from "./routes/user";
import messageRoute from "./routes/message";
import chatRoute from "./routes/chat";
import authRoute from "./routes/auth";
import errorHandler from "./middlewares/errorHandler";
import { initServer } from "./connections/initServer";
import { NotFoundError } from "./errors/notFoundError";
import { checkUserAuthentication } from "./middlewares/authenticateUser";
import { swaggerOptions } from "./swagger.config";
//#endregion

// * configures dotenv to work in the application
dotenv.config();

// * Express initialization
const app: Application = express();
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// * Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); // By default, this will allow all origins, all methods, and all headers
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// * Routes
const apiV1 = express.Router();
app.use("/api/v1", apiV1);

apiV1.use("/auth", authRoute);
apiV1.use("/users", checkUserAuthentication, userRoute);
apiV1.use("/messages", checkUserAuthentication, messageRoute);
apiV1.use("/chats", checkUserAuthentication, chatRoute);

app.get('/io', (req, res) => {
    const filePath = join(__dirname, '..', 'public', 'index.html');
    res.sendFile(filePath);
});


apiV1.all("*", checkUserAuthentication, (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError("Invalid api"));
});

// * Error handling
app.use(errorHandler);

// * Server initialization
initServer(app);
