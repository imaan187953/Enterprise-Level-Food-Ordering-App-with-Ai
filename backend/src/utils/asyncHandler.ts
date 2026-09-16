import { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const asyncHandler = (handler: AsyncHandler) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

export default asyncHandler;