// * Global dependencies
//#region
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
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
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// * Middlewares

// TODO: Helmet Package
// app.use(helmet());

app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); // By default, this will allow all origins, all methods, and all headers
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


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

// * Server initialization
initServer(app);
