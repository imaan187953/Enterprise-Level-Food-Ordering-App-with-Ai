import { Request, Response } from "express";
/**
 * Register
 * POST /api/v1/auth/register
 */
export declare const register: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Login
 * POST /api/v1/auth/login
 */
export declare const login: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get Current User
 * GET /api/v1/auth/me
 */
export declare const getCurrentUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Update Profile
 * PATCH /api/v1/auth/profile
 */
export declare const updateProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Change Password
 * PATCH /api/v1/auth/password
 */
export declare const changePassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Admin Login
 * POST /api/v1/auth/admin/login
 */
export declare const adminLogin: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Get Current Admin
 * GET /api/v1/auth/admin/me
 *
 * Authentication + admin role verification
 * is handled by middleware in auth.routes.ts.
 */
export declare const getCurrentAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
/**
 * Reactivate Account
 * POST /api/v1/auth/reactivate
 */
export declare const reactivate: (req: Request, res: Response, next: import("express").NextFunction) => void;
