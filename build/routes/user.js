"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validateMongoID_1 = require("../middlewares/validateMongoID");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_1.UserController();
        this.intializeRoutes();
    }
    intializeRoutes() {
        /**
         * @swagger
         * /api/v1/users:
         *  get:
         *    summary: Get all users
         *    description: Retrieve a list of all users.
         *  responses:
         *    200:
         *      description: A list of user.
         */
        this.router.route("/")
            .get(this.controller.getAllUsers)
            .delete(this.controller.deleteUser)
            .put(this.controller.updateUser);
        this.router.route("/:id")
            .get(validateMongoID_1.validateMongoID, this.controller.getOneUser);
    }
}
exports.default = new UserRoutes().router;
