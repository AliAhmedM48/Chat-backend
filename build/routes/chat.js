"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateMongoID_1 = __importDefault(require("../middlewares/validateMongoID"));
const chat_1 = require("../validations/chat");
const express_1 = require("express");
const chatRoutes = (controller) => {
    const router = (0, express_1.Router)();
    router
        .route("/")
        .get(controller.getByUserIdOrByChatId)
        .delete(controller.leaveChat);
    router.route("/createGroup").post(chat_1.createGroupValid, controller.createGroup);
    router
        .route("/createChatPrivate")
        .post(chat_1.createPrivateValid, controller.createChatPrivate);
    router
        .route("/:id")
        .all(validateMongoID_1.default)
        .get(controller.getByUserIdOrByChatId)
        .put(controller.updateChat);
    return router;
};
exports.default = chatRoutes;
/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get chats by user ID or chat ID
 *     description: Retrieve chats associated with a user ID or a chat ID.
 *     tags: [Chat Section]  # Assuming you have a Chat Section defined in your Swagger document
 *     security:
 *       - bearerAuth: []   # This endpoint requires a bearer token
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the user or chat to retrieve chats for. If not provided, the logged-in user's ID will be used.
 *     responses:
 *       200:
 *         description: Chats found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */
/**
 * @swagger
 * /chats:
 *   delete:
 *     summary: Delete chat
 *     description: Delete a chat by its ID.
 *     tags: [Chat Section]
 *     security:
 *       - bearerAuth: []   # This endpoint requires a bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *                 description: The ID of the chat to leave.
 *     responses:
 *       204:
 *         description: Chat successfully left.
 *       404:
 *         description: Chat not found.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */
/**
 * @swagger
 * /chats/createGroup:
 *   post:
 *     summary: Create a group chat
 *     description: Create a group chat with the specified users.
 *     tags: [Chat Section]  # Assuming you have a Chat Section defined in your Swagger document
 *     security:
 *       - bearerAuth: []   # This endpoint requires a bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the group chat.
 *               lastMessage:
 *                 type: string
 *                 description: The last message in the group chat.
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of user IDs representing the members of the group chat.
 *     responses:
 *       201:
 *         description: Group chat created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                 chat:
 *                   $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Bad request error. This error occurs when the request body fails validation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */
/**
 * @swagger
 * /chats/createChatPrivate:
 *   post:
 *     summary: Create a private chat
 *     description: Create a private chat with the specified receiver.
 *     tags: [Chat Section]  # Assuming you have a Chat Section defined in your Swagger document
 *     security:
 *       - bearerAuth: []   # This endpoint requires a bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverId:
 *                 type: string
 *                 description: The ID of the receiver for the private chat.
 *     responses:
 *       201:
 *         description: Private chat created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                 chat:
 *                   $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Bad request error. This error occurs when the request body fails validation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */
/**
 * @swagger
 * /chats/{id}:
 *   get:
 *     summary: Get chats by user ID or chat ID
 *     description: Retrieve chats by user ID or chat ID. If a user ID is provided, it retrieves chats associated with that user. If a chat ID is provided, it retrieves the chat with that ID.
 *     tags: [Chat Section]  # Assuming you have a Chat Section defined in your Swagger document
 *     security:
 *       - bearerAuth: []   # This endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user or chat to retrieve chats for.
 *     responses:
 *       200:
 *         description: Chats retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Bad request error. This error occurs when the provided ID is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       404:
 *         description: Not found. This error occurs when no chats are found for the provided ID.
 *       500:
 *         description: Internal Server Error.
 */
/**
 * @swagger
 * /chats/{id}:
 *   put:
 *     summary: Update a chat
 *     description: Update details of a chat by its ID.
 *     tags: [Chat Section]  # Assuming you have a Chat Section defined in your Swagger document
 *     security:
 *       - bearerAuth: []   # This endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of user IDs participating in the chat.
 *               name:
 *                 type: string
 *                 description: The name of the chat.
 *               isGroup:
 *                 type: boolean
 *                 description: Indicates if the chat is a group chat.
 *               lastMessage:
 *                 type: string
 *                 description: The last message in the chat.
 *               isEmpty:
 *                 type: boolean
 *                 description: Indicates if the chat is empty.
 *     responses:
 *       200:
 *         description: Chat updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Bad request error. This error occurs when the provided ID is invalid or the request body is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       404:
 *         description: Not found. This error occurs when the chat with the provided ID is not found.
 *       500:
 *         description: Internal Server Error.
 * security:
 *   - bearerAuth: []
 */
