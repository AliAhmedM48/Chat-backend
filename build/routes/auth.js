"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../validations/auth");
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const authRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router
        .post("/register", auth_1.registerValidator, controller.register)
        .post("/login", auth_1.loginValidator, controller.login)
        .put("/logout", authenticateUser_1.default, controller.logout);
    return router;
};
exports.default = authRoutes;
