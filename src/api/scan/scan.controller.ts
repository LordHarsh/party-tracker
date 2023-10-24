import { Request, Response, NextFunction } from "express";
import { handleScan, handleScanAllowMore, handleScanIgnore } from "./scan.services";

export const scanController = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const data = await handleScan(req.body.id, req.body.name);
        res.status(200).json({
            success: true,
            message: 'Scan successful',
            data
        });
    } catch (error) {
        next(error);
    }
};

export const scanAllowMore = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const data = await handleScanAllowMore(req.body.id, req.body.name, res.locals.user.name);
        res.status(200).json({
            success: true,
            message: 'Allow successful',
            data
        });
    } catch (error) {
        next(error);
    }
};

export const scanIgnore = async (req: Request, res:Response, next: NextFunction) => {
    try {
        await handleScanIgnore(req.body.id, req.body.name);
        res.status(200).json({
            success: true,
            message: 'Ignore successful',
        });
    } catch (error) {
        next(error);
    }
};