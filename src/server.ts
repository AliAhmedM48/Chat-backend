// * Project dependencies
import { app } from "./app";

const PORT = process.env.PORT;

const initServer = async () => {
    //#region 
    app
        .listen(PORT, () => { console.log("Server running at PORT: ", PORT) })
        .on("error", (error) => { throw new Error(error.message) }); // * gracefully handle error
    //#endregion
}

// * Server initialization
initServer();