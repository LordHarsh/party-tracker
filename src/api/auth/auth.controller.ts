import { NextFunction, Request, Response } from 'express';
import { handleLoginUser } from './auth.services';

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userObj = { email: req.body.email, password: req.body.password };
    const data = await handleLoginUser(userObj.email, userObj.password);
    res.status(200).json({
      success: true,
      message: "Successfully logged in!!",
      data,
    });
  } catch (error) {
    next(error);
  }
};