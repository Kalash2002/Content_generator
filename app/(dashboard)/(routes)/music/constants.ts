import * as z from "zod";

export const formVarification = z.object({
  prompt: z.string(),
});