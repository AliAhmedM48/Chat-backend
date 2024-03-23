"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateMongoID_1 = __importDefault(require("../middlewares/validateMongoID"));
const express_1 = require("express");
const userRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router.route("/")
        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Get all users
         *     description: Retrieve a list of all users.
         *     tags: [User Section]
         *
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: A list of users.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/User'
         *       401:
         *         description: Unauthorized - Token is missing or invalid.
         *       500:
         *         description: Internal Server Error.
         */
        /**
      * @swagger
      * /users/{id}:
      *   get:
      *     summary: Get user by ID
      *     description: Retrieve a user by their ID.
      *     tags: [User Section]  # Assuming you have a Users Section defined in your Swagger document
      *     security:
      *       - bearerAuth: []
      *     parameters:
      *       - in: path
      *         name: id
      *         required: true
      *         schema:
      *           type: string
      *         description: The ID of the user to retrieve.
      *     responses:
      *       200:
      *         description: User found.
      *         content:
      *           application/json:
      *             schema:
      *               type: object
      *               properties:
      *                 success:
      *                   type: boolean
      *                   description: Indicates if the request was successful.
      *                 data:
      *                   $ref: '#/components/schemas/User'
      *       404:
      *         description: User not found.
      *       500:
      *         description: Internal Server Error.
      */
        .get(controller.getAllUsers)
        /**
         * @swagger
         * /users:
         *   delete:
         *     summary: Delete a user
         *     description: Delete the logged-in user.
         *     tags: [User Section]  # Assuming you have a Users Section defined in your Swagger document
         *     security:
         *       - bearerAuth: []   # This endpoint requires a bearer token
         *     responses:
         *       204:
         *         description: User successfully deleted.
         *       401:
         *         description: Unauthorized - Token is missing or invalid.
         *       500:
         *         description: Internal Server Error.
         */
        .delete(controller.deleteUser)
        /**
         * @swagger
         * /users:
         *   put:
         *     summary: Update user information
         *     description: Update information of the logged-in user.
         *     tags: [User Section]  # Assuming you have a Users Section defined in your Swagger document
         *     security:
         *       - bearerAuth: []   # This endpoint requires a bearer token
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
         *               avatar:
         *                 type: string
         *               isOnline:
         *                 type: boolean
         *     responses:
         *       200:
         *         description: User information successfully updated.
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
         *                   description: Updated user data.
         *       304:
         *         description: Not modified. The request body is empty.
         *       401:
         *         description: Unauthorized - Token is missing or invalid.
         *       404:
         *         description: User not found.
         *       500:
         *         description: Internal Server Error.
         */
        .put(controller.updateUser);
    router.route("/:id")
        .get(validateMongoID_1.default, controller.getOneUser);
    return router;
};
exports.default = userRoutes;
