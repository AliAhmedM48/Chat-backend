"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateMongoID_1 = __importDefault(require("../middlewares/validateMongoID"));
const express_1 = require("express");
const userRoutes = (controller) => {
    const router = (0, express_1.Router)();
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
    router.route("/")
        .get(controller.getAllUsers)
        .delete(controller.deleteUser)
        .put(controller.updateUser);
    router.route("/:id")
        .get(validateMongoID_1.default, controller.getOneUser);
    return router;
};
exports.default = userRoutes;
