import mongoose from "mongoose"
import { ProductReview_t } from "./productReview.types"

const productReviewSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		trim: true,
	},
	userID: {
		type: String,
		required: true,
		trim: true,
	},
	starsGiven: {
		type: Number,
		required: true,
		min: 0,
	},
	review: {
		type: String,
		required: true,
		trim: true,
		min: 0,
	},
	whenReviewed: {
		type: Date,
		required: true,
		trim: true,
	},
	userName: {
		type: String,
		required: true,
		trim: true,
	},
})

export const ProductReview = mongoose.model<ProductReview_t>(
	"productReviews",
	productReviewSchema
)
