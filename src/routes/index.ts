import { Application } from "express";
import userRoutes from "./user.route";

export default class Routes {
    constructor(app: Application) {
        app.use("/api", userRoutes);
    }
}