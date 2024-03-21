"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
// * Project dependencies
const node_http_1 = require("node:http");
const connectToSocket_1 = require("./connectToSocket");
const connectToMongoDB_1 = require("./connectToMongoDB");
const initServer = (app) => __awaiter(void 0, void 0, void 0, function* () {
    //#region 
    const PORT = process.env.PORT || 3000;
    const server = (0, node_http_1.createServer)(app);
    server
        .listen(PORT, () => {
        // * MongoDB Connection
        (0, connectToMongoDB_1.connectToMongoDB)(`${process.env.DB_HOST_MONGO}`);
        // * Socket io initialization
        (0, connectToSocket_1.connectToSocket)(server);
        console.log("Server running at PORT: ", PORT);
    })
        .on("error", (error) => { throw new Error(error.message); }); // * gracefully handle error
    //#endregion
});
exports.initServer = initServer;
