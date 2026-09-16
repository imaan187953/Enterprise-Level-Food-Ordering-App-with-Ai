import mongoose, { Schema, HydratedDocument } from "mongoose";
import { IUser, UserRole } from "../types/user.types.js";

export type IUserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    phone: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String,
      trim: true,
      default: "",
    },

    role: {
      type: String,
      enum: {
        values: ["customer", "admin"] as UserRole[],
        message: "Role must be customer or admin",
      },
      default: "customer",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;