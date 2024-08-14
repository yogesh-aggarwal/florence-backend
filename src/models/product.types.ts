import mongoose from "mongoose"

export type ProductDescriptionItem_t = {
	type: "para" | "list"
	content: string | ProductDescriptionItem_t[]
}

export type ProductReview_t = {
	id: string
	userID: string
	starsGiven: number
	review: string
	whenReviewed: string
}

export type Product_t = {
	_id: mongoose.Types.ObjectId
	title: string
	price: number
	images: string[]
	description: ProductDescriptionItem_t[]
	deliveryInfo: ProductDescriptionItem_t[]
	careInstructions: ProductDescriptionItem_t[]
	discountInPercent: number
	stock: number
	deliveryCharges: number
	starRatings: number
	reviews: ProductReview_t[]
}
