"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../validations/auth");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new auth_1.AuthController();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router
            .post("/register", auth_2.registerValidator, this.controller.register)
            .post("/login", auth_2.loginValidator, this.controller.login);
    }
}
exports.default = new AuthRoutes().router;
