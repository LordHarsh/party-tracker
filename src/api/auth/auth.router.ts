import { Router } from 'express';
import { loginUser, createUser } from './auth.controller';
import { validateRequest } from '../../shared/middlewares/validator';
import { createUserSchema, loginUserSchema } from './auth.schema';

export default (): Router => {
  const app = Router();
  app.post('/signup', validateRequest('body', createUserSchema), createUser);
  app.post('/login', validateRequest('body', loginUserSchema), loginUser);
  return app;
};