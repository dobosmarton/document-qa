import { z } from "zod";

const messageSchema = z.object({
  content: z.string(),
  role: z.enum(["user", "assistant", "system", "memory"]),
});

export const bodySchema = z.object({
  messages: z.array(messageSchema),
});

export type Message = z.infer<typeof messageSchema>;
