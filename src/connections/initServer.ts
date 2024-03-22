// * Project dependencies
import { createServer } from "node:http";
import { Application } from "express";
import connectToMongoDB from "./connectToMongoDB";
import connectToSocket from "./connectToSocket";


const initServer = async (app: Application) => {

    //#region 
    const PORT = process.env.PORT || 3000;
    const server = createServer(app);

    server
        .listen(PORT, () => {

            // * MongoDB Connection
            connectToMongoDB(`${process.env.DB_HOST_MONGO}`);

            // * Socket io initialization
            connectToSocket(server);

            console.log("Server running at PORT: ", PORT);

        })
        .on("error", (error) => { throw new Error(error.message) }); // * gracefully handle error
    //#endregion
}

export { initServer };