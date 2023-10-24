import { Request, Response, NextFunction } from "express";
import { handleGetCount, handleAllow } from "./people.services";

export const getCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await handleGetCount(req.params.id);
        return res.status(200).send({
            success: true,
            message: 'Count Retrived!',
            count,
        });
    } catch (error) {
        next(error);
    }
};

export const allow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await handleAllow(req.params.id);
        return res.status(200).send({
            success: true,
            message: 'ALLOWED!'
        })
    } catch (error) {
        next(error);
    }
};