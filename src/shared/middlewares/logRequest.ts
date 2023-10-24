import { Request, Response, NextFunction } from "express";
import LoggerInstance from "../../loaders/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    LoggerInstance.info(req.url)
    next();
}