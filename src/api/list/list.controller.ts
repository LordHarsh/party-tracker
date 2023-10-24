import { Request, Response, NextFunction } from 'express';
import { handleGetList, handleListAllow, handleListDeny } from './list.services';

export const getList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const people = await handleGetList();
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved list',
            data: people,
        });
    } catch (error) {
        next(error);
    }
};

export const listAllow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await handleListAllow(req.body.id, req.body.name);
        res.status(200).json({
            success: true,
            message: 'Successfully allowed person',
        });
    } catch (error) {
        next(error);
    }
};

export const listDeny = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await handleListDeny(req.body.id, req.body.name);
        res.status(200).json({
            success: true,
            message: 'Successfully denied person',
        });
    } catch (error) {
        next(error);
    }
};
