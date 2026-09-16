import { Request, Response, NextFunction } from "express";
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const asyncHandler: (handler: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => void;
export default asyncHandler;
