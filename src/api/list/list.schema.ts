import { z } from "zod";

export const listSchema = z.object({
    id: z.string().length(24),
    name: z.string(),
});