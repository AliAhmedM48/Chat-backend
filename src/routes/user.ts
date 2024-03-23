import UserController from "../controllers/user";
import validateMongoID from "../middlewares/validateMongoID";

import { Router } from "express";

/**
 * Defines routes related to user management.
 * @param {UserController} controller - The user controller handling user-related operations.
 * @returns {Router} - Express router instance with user routes configured.
 */
const userRoutes = (controller: UserController) => {
  const router = Router();

  /**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *       500:
 *         description: Internal Server Error.
 */

  router.route("/")

    /**
      * Get all users.
      * @route GET /api/v1/users
      * @group Users - Operations about users
      * @returns {object} 200 - An array of user objects
      * @returns {object} 500 - Internal server error
      */
    .get(controller.getAllUsers) // Endpoint to get all users

    /**
   * Delete a user.
   * @route DELETE /api/v1/users
   * @group Users - Operations about users
   * @returns {object} 204 - No content
   * @returns {object} 500 - Internal server error
   */

    .delete(controller.deleteUser) // Endpoint to delete a user


    /**
     * Update a user.
     * @route PUT /api/v1/users
     * @group Users - Operations about users
     * @returns {object} 200 - User updated successfully
     * @returns {object} 400 - Bad request
     * @returns {object} 500 - Internal server error
     */

    .put(controller.updateUser); // Endpoint to update a user
  /**
    * @swagger
    * /api/v1/users/{id}:
    *   get:
    *     summary: Get a user by ID
    *     description: Retrieve a user by their ID.
    *     parameters:
    *       - in: path
    *         name: id
    *         description: ID of the user to retrieve
    *         required: true
    *         schema:
    *           type: string
    *           format: mongo-id
    *     responses:
    *       200:
    *         description: User found
    *       404:
    *         description: User not found
    *       500:
    *         description: Internal Server Error.
    */
  router.route("/:id")
    /**
      * Get a user by ID.
      * @route GET /api/v1/users/{id}
      * @group Users - Operations about users
      * @param {string} id.path.required - User ID
      * @returns {object} 200 - User object
      * @returns {object} 404 - User not found
      * @returns {object} 500 - Internal server error
      */
    .get(validateMongoID, controller.getOneUser); // Endpoint to get a user by ID

  return router;
}

export default userRoutes