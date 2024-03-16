"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
// ^ Schema
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, 'First Name is Required'] },
    lastName: { type: String, required: [true, 'Last Name is Required'] },
    email: { type: String, required: [true, 'Email is Required'] },
    password: { type: String, required: [true, 'Password is Required'] },
    avatar: { type: String, default: "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=" },
    isOnline: { type: Boolean, default: false }
}, { timestamps: true });
// ^ Model
const User = (0, mongoose_1.model)('User', userSchema, 'users');
