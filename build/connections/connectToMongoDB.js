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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToMongoDB = (db_url) => __awaiter(void 0, void 0, void 0, function* () {
    //#region 
    try {
        mongoose_1.default
            .connect(db_url, {
            dbName: process.env.DB_NAME
        })
            .then(() => {
            console.log("Connected to MongoDB", process.env.PORT);
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    //#endregion
});
exports.default = connectToMongoDB;
