import { ObjectId } from "mongodb"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const RecieptMetadata_t = z.object({
	createdBy: z.string(),
	createdAt: z.number(),

	updatedAt: z.number(),
	isUpdated: z.boolean(),
})
export type RecieptMetadata_t = z.infer<typeof RecieptMetadata_t>

// --------------------------------------------------------------------------------------

export const Reciept_t = z.object({
	_id: z.instanceof(ObjectId),
	metadata: RecieptMetadata_t,

	url: z.string(),
})
export type Reciept_t = z.infer<typeof Reciept_t>

// --------------------------------------------------------------------------------------
