import { ObjectId } from "mongodb"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const UserViewHistoryItem_t = z.object({
	productID: z.string(),
	viewedAt: z.number(),
})
export type UserViewHistoryItem_t = z.infer<typeof UserViewHistoryItem_t>

// --------------------------------------------------------------------------------------

export const UserViewHistory_t = z.object({
	_id: z.instanceof(ObjectId),
	userID: z.string(),
	history: z.array(UserViewHistoryItem_t),
})
export type UserViewHistory_t = z.infer<typeof UserViewHistory_t>

// --------------------------------------------------------------------------------------
