import * as z from "zod";

export const chatMessageValidator = z.object({
  userId: z.string(),
  content: z.string().max(500),
});
