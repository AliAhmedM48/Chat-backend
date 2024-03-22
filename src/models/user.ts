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

// // ^ Interface
// export type UserCreationParams = Pick<IUser, "firstName" | "lastName" | "email" | "password">;

// ^ Schema
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: [true, "First Name is Required"] },
    lastName: { type: String, required: [true, "Last Name is Required"] },
    email: { type: String, unique: true, required: [true, "Email is Required"], },
    password: { type: String, required: [true, "Password is Required"] },
    isOnline: { type: Boolean, default: false },
    avatar: String,
  },
  { timestamps: true }
);

// ^ Model
const User = model<IUser>("User", userSchema, "users");

export default User;