"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new message_controller_1.MessageController();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router
            .post('/messages', this.controller.create)
            .get('/messages', this.controller.findAll);
        this.router
            .get('/messages/:id', this.controller.findOne)
            .put('/messages/:id', this.controller.update)
            .delete('/messages/:id', this.controller.delete)
            .delete('/messages', this.controller.delete);
    }
}
exports.default = new UserRoutes().router;
