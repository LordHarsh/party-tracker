import { NextFunction, Request, Response } from 'express';
import { handleLoginUser, handleSignupUser } from './auth.services';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await handleSignupUser(
      req.body.name, 
      req.body.email, 
      req.body.password,
      req.body.year,
      req.body.domain,
      req.body.role,
    );
    res.status(200).json({
      success: true,
      message: "Successfully logged in!!",
      data,
    });
  } catch (error) {
    next(error);
  }
}

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