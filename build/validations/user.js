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
const validate_1 = __importDefault(require("../middlewares/validate"));
const badRequestError_1 = __importDefault(require("../errors/badRequestError"));
const validateUpdateRequest = [
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email, password, avatar } = req.body;
        //#region request validation
        const presentParams = [];
        firstName && presentParams.push('firstName');
        lastName && presentParams.push('lastName');
        email && presentParams.push('email');
        password && presentParams.push('password');
        avatar && presentParams.push('avatar');
        console.log(presentParams.length);
        if (presentParams.length < 1) {
            const errorMessage = 'At least one parameter from firstName, lastName, email, password, avatar must be present in the request body for update.';
            return next(new badRequestError_1.default(errorMessage));
        }
        next();
        //#endregion
    }),
    validate_1.default
];
exports.default = validateUpdateRequest;
