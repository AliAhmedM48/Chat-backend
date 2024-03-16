"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.UserController();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router
            .get('/users', this.controller.findAll);
        this.router
            .get('/users/:id', this.controller.findOne)
            .put('/users/:id', this.controller.update)
            .delete('/users/:id', this.controller.delete);
        this.router
            .post('/auth/register', this.controller.create)
            .post('/auth/login', this.controller.login);
    }
}
exports.default = new UserRoutes().router;
