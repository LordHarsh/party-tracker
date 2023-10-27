import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  password: z.string().length(8).nonempty({ message: 'Password is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  year: z.number().min(1).max(4),
  domain: z.string().nonempty({ message: 'Domain is required' }),
  role: z.string().nonempty({ message: 'Role is required' }),
 });

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});