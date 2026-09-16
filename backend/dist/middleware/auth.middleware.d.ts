import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedUser } from "../types/auth.types.js";
export interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
}
export declare const authenticate: (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
