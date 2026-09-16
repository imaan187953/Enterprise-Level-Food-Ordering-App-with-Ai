import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
export declare const get: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const add: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const update: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const remove: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const clear: (req: AuthenticatedRequest, res: Response) => Promise<void>;
