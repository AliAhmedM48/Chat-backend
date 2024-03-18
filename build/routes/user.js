"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validateMongoID_1 = require("../middlewares/validateMongoID");
const user_2 = require("../validations/user");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_1.UserController();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route("/").get(this.controller.getAllUsers);
        this.router
            .route("/:id")
            .all(validateMongoID_1.validateMongoID)
            .get(this.controller.getOneUser)
            .put(user_2.validateUpdateRequest, this.controller.updateUser)
            .delete(this.controller.deleteUser);
    }
}
exports.default = new UserRoutes().router;
