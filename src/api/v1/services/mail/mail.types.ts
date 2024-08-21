import { z } from "zod"

export const Mail_t = z.object({
	to: z.string().email(),
	subject: z.string().min(1),
	content: z.string().min(1),
})
export type Mail_t = z.infer<typeof Mail_t>
