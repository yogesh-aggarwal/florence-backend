import mongoose, { model, Schema } from "mongoose"
import { ProductReview_t } from "./productReview.types"

// --------------------------------------------------------------------------------------

const ProductReviewMetadataSchema = new Schema({
	createdBy: { type: String, required: true },
	createdAt: { type: Number, required: true },
	editedAt: { type: Number, required: true },
	isEdited: { type: Boolean, required: true },
})

const ProductReviewSchema = new Schema({
	_id: { type: mongoose.Types.ObjectId, required: true },
	metadata: { type: ProductReviewMetadataSchema, required: true },
	productID: { type: String, required: true },
	starsGiven: { type: Number, required: true },
	reviewContent: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductReview = model<ProductReview_t>(
	"review",
	ProductReviewSchema,
	"reviews"
)

// --------------------------------------------------------------------------------------
