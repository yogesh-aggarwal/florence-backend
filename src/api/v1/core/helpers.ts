import { Request } from "express"
import { z } from "zod"
import { User_t } from "../models/user.types"

export function getRequestingUser(req: Request): User_t | null {
	const user = (req as any)["user"] as User_t | undefined
	if (!user) return null

	return user
}

export function parseRequestBody<T>(req: Request, schema: z.ZodType): T | null {
	const body = schema.safeParse(req.body)
	if (!body.success) return null

	return body.data as T
}
