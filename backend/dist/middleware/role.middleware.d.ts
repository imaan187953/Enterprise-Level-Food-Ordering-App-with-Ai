import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware.js";
export declare const requireAdmin: (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
