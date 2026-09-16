import { Response } from "express";
/**
 * GET /api/v1/user/profile
 */
export declare const getProfile: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * PATCH /api/v1/user/profile
 */
export declare const updateProfile: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * PATCH /api/v1/user/avatar
 */
export declare const changeAvatar: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * PATCH /api/v1/user/phone
 */
export declare const changePhone: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * PATCH /api/v1/user/status
 */
export declare const updateOwnStatus: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * GET /api/v1/admin/users
 */
export declare const adminGetUsers: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * GET /api/v1/admin/users/:id
 */
export declare const adminGetUser: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
/**
 * PATCH /api/v1/admin/users/:id/status
 */
export declare const adminUpdateUserStatus: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
