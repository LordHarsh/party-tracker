import { z } from 'zod';

export const scanSchema = z.object({
  id: z.string().length(24),
  name: z.string(),
});