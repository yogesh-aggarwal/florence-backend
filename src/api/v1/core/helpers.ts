import { Request } from "express"
import { User_t } from "../models/user.types"

export function getRequestingUser(req: Request): User_t | null {
	const user = (req as any)["user"] as User_t | undefined
	if (!user) return null

	return user
}
