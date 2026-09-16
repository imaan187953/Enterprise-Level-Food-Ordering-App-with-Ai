import type { Document } from "mongoose";
export type UserRole = "user" | "admin";
export interface IUser {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
    role: UserRole;
    isActive: boolean;
    isEmailVerified: boolean;
}
export type UserDocument = IUser & Document;
