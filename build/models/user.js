"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// // ^ Interface
// export type UserCreationParams = Pick<IUser, "firstName" | "lastName" | "email" | "password">;
// ^ Schema
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, "First Name is Required"] },
    lastName: { type: String, required: [true, "Last Name is Required"] },
    email: { type: String, unique: true, required: [true, "Email is Required"], },
    password: { type: String, required: [true, "Password is Required"] },
    isOnline: { type: Boolean, default: false },
    avatar: String,
}, { timestamps: true });
// ^ Model
const User = (0, mongoose_1.model)("User", userSchema, "users");
exports.default = User;
