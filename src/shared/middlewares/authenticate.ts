import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../jwt';
import database from '../../loaders/mongo';
import config from "../../config";


export default function authenticateToken() {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1];
      if (!token) {
        throw { statusCode: 401, message: 'Token Not Found' };
      }
      const { email } = verifyToken(token);
      const data = await (await database()).collection(config.collectionName).findOne({ email, host: true });
      if (!data) {
        throw { statusCode: 404, message: 'Host Not Found' };
      }
      res.locals.user = data;
      next();
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
}