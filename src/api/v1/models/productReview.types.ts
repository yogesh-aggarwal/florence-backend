import { ObjectId } from "mongodb"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const ProductReviewMetadata_t = z.object({
	createdBy: z.string(),
	createdAt: z.number(),

	editedAt: z.number(),
	isEdited: z.boolean(),
})
export type ProductReviewMetadata_t = z.infer<typeof ProductReviewMetadata_t>

// --------------------------------------------------------------------------------------

export const ProductReview_t = z.object({
	_id: z.instanceof(ObjectId),
	metadata: ProductReviewMetadata_t,

	productID: z.string(),
	starsGiven: z.number(),
	reviewContent: z.string(),
})
export type ProductReview_t = z.infer<typeof ProductReview_t>

// --------------------------------------------------------------------------------------
