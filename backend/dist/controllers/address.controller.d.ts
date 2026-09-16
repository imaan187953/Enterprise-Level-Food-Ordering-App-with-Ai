import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
export declare const create: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const getAll: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const getById: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const update: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const setDefault: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const remove: (req: AuthenticatedRequest, res: Response) => Promise<void>;
