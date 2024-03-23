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
    /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registers a new user
   *     description: Registers a new user
   *     tags: [Auth Section]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               passwordConfirmation:
   *                 type: string
   *     responses:
   *       201:
   *         description: Success message and user data. The registration was successful, and the response includes a success indicator, user data.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Indicates if the request was successful.
   *                 data:
   *                   type: object
   *                   description: User data.
   *       400:
   *         description: Bad request error. This error occurs when the request body fails validation, such as missing required fields or invalid data format.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Indicates if the request was successful.
   *                 errors:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       param:
   *                         type: string
   *                         description: The parameter that failed validation.
   *                       message:
   *                         type: string
   *                         description: A message describing the validation failure.
   */
    router.post("/register", auth_1.registerValidator, controller.register);
    /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Logs in a user
   *     description: Logs in a user using email and password credentials.
   *     tags: [Auth Section]
    *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Success message, user data, and authentication token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Indicates if the request was successful.
   *                 data:
   *                   type: object
   *                   description: User data.
   *                 token:
   *                   type: string
   *                   description: Authentication token.
   *       404:
   *         description: Invalid email or password. This error occurs when the provided email or password is incorrect.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Indicates if the request was successful.
   *                 error:
   *                   type: string
   *                   description: Error message indicating invalid email or password.
   *       400:
   *         description: Bad request error. This error occurs when the request body fails validation, such as missing required fields or invalid data format.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Indicates if the request was successful.
   *                 errors:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       param:
   *                         type: string
   *                         description: The parameter that failed validation.
   *                       message:
   *                         type: string
   *                         description: A message describing the validation failure.
   */
    router.post("/login", auth_1.loginValidator, controller.login);
    router.put("/logout", authenticateUser_1.default, controller.logout);
    return router;
};
exports.default = authRoutes;
