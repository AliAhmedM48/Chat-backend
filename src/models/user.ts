import { Schema, model } from "mongoose";

// ^ Interface
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  isOnline: boolean;
}

// ^ Schema
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: [true, "First Name is Required"] },
    lastName: { type: String, required: [true, "Last Name is Required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
    },
    password: { type: String, required: [true, "Password is Required"] },
    avatar: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=",
    },
    isOnline: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ^ Model
const User = model<IUser>("User", userSchema, "users");

export default User;