import { z } from "zod";

export const paramsIdSchema = z.object({
    id: z.string().length(24),
});