import { Types } from "mongoose"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const Coupon_t = z.object({
	_id: z.instanceof(Types.ObjectId),

	code: z.string(),
	amount: z.number().nullable(),
	minAmount: z.number().nullable(),

	percentage: z.number().nullable(),
	maxAmount: z.number().nullable(),

	isActive: z.boolean(),
	validFrom: z.number().nullable(),
	validUntil: z.number().nullable(),

	createdAt: z.number(),
	createdBy: z.string(),
	updatedAt: z.number(),
	updatedBy: z.string(),
	isUpdated: z.boolean(),

	usersUsed: z.number(),
	usedBy: z.array(z.string()),

	usersLimit: z.number().nullable(),
})
export type Coupon_t = z.infer<typeof Coupon_t>

// --------------------------------------------------------------------------------------
