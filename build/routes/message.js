"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("../validations/message"));
const validateMongoID_1 = __importDefault(require("../middlewares/validateMongoID"));
const express_1 = require("express");
const messageRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router
        .route("/")
        .post(message_1.default, controller.createMessage)
        .delete(controller.deleteMessage); // two cases, mutiple messages or one, [body.id]
    router
        .route("/:chatId")
        .all(validateMongoID_1.default)
        .get(controller.getAllMessages);
    router
        .route("/:id")
        .all(validateMongoID_1.default)
        .put(controller.updateMessage);
    return router;
};
exports.default = messageRoutes;
/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     description: Create a new message in a chat, either by providing the chat ID or the receiver ID
 *     tags:
 *       - Message Section
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverId:
 *                 type: string
 *                 description: The ID of the message receiver. Either this or chatId must be provided.
 *               chatId:
 *                 type: string
 *                 description: The ID of the chat where the message will be sent. Either this or receiverId must be provided.
 *               body:
 *                 type: string
 *                 description: The content of the message.
 *               image:
 *                 type: string
 *                 description: The image attached to the message.
 *     responses:
 *       '201':
 *         description: Successfully created a new message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *                 lastMessagee:
 *                   type: string
 *                   description: The last message in the chat after adding the new message.
 *       '400':
 *         description: Bad request. Indicates that either receiverId or chatId is missing in the request body.
 *       '401':
 *         description: Unauthorized. Indicates that the user is not authenticated or the token is invalid.
 *       '404':
 *         description: Not found. Indicates that either the chat or the receiver does not exist.
 */
/**
 * @swagger
 * /messages:
 *   delete:
 *     summary: Delete message(s) by ID(s)
 *     description: Delete message(s) by providing their ID(s)
 *     tags:
 *       - Message Section
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the message to delete. Can be a single ID or an array of IDs.
 *     responses:
 *       '204':
 *         description: Successfully deleted the message(s)
 *       '404':
 *         description: Not found. Indicates that the message(s) with the provided ID(s) were not found.
 *       '401':
 *         description: Unauthorized. Indicates that the user is not authenticated or the token is invalid.
 */
/**
 * @swagger
 * /messages/{chatId}:
 *   get:
 *     summary: Get all messages of a chat
 *     description: Retrieve all messages of a chat based on the provided chat ID
 *     tags:
 *       - Message Section
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         description: The ID of the chat to retrieve messages from
 *         schema:
 *           type: string
 *           format: mongoId
 *     responses:
 *       '200':
 *         description: A list of messages of the chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the operation was successful
 *                 data:
 *                   type: array
 *                   description: List of messages
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       '400':
 *         description: Bad Request. Indicates that the provided chat ID is invalid or not found.
 *       '401':
 *         description: Unauthorized. Indicates that the user is not authenticated or the token is invalid.
 */
/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     summary: Update a message
 *     description: Update the content or image of a message based on the provided message ID
 *     tags:
 *       - Message Section
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to update
 *         schema:
 *           type: string
 *           format: mongoId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: The updated body of the message
 *               image:
 *                 type: string
 *                 description: The updated image of the message
 *     responses:
 *       '200':
 *         description: The updated message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the operation was successful
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       '400':
 *         description: Bad Request. Indicates that the provided message ID is invalid or not found.
 *       '401':
 *         description: Unauthorized. Indicates that the user is not authenticated or the token is invalid.
 *       '404':
 *         description: Not Found. Indicates that the message with the provided ID was not found.
 */
