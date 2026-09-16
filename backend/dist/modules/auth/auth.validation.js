"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Please provide a valid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters"),
    phone: zod_1.z
        .string()
        .trim()
        .min(7, "Phone number is too short")
        .max(20, "Phone number is too long")
        .optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Please provide a valid email address"),
    password: zod_1.z
        .string()
        .min(1, "Password is required"),
});
//# sourceMappingURL=auth.validation.js.map