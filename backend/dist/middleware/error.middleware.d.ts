import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
export declare const errorMiddleware: (error: Error | ApiError, _req: Request, res: Response, _next: NextFunction) => void;
