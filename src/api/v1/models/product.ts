import { model, Schema, Types } from "mongoose"
import { Product_t } from "./product.types"

// --------------------------------------------------------------------------------------

const ProductDescriptionItemSchema = new Schema({
	type: { type: String, enum: ["para", "list"], required: true },
	content: { type: Schema.Types.Mixed, required: true },
})

const ProductDetailsSchema = new Schema({
	stock: { type: Number, required: true },
	tags: { type: [String], required: true },
	categories: { type: [String], required: true },

	description: { type: [ProductDescriptionItemSchema], required: true },
	deliveryInfo: { type: [ProductDescriptionItemSchema], required: true },
	careInstructions: { type: [ProductDescriptionItemSchema], required: true },
})

const ProductStatsSchema = new Schema({
	views: { type: Number, required: true },
	starRatings: { type: Number, required: true },
	reviewsCount: { type: Number, required: true },
})

const ProductCostingSchema = new Schema({
	originalPrice: { type: Number, required: true },
	discountInPercent: { type: Number, required: true },
	baseDeliveryCharges: { type: Number, required: true },
})

const ProductSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	title: { type: String, required: true },
	price: { type: Number, required: true },
	images: { type: [String], required: true },
	details: { type: ProductDetailsSchema, required: true },
	stats: { type: ProductStatsSchema, required: true },
	costing: { type: ProductCostingSchema, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductModel = model<Product_t>(
	"product",
	ProductSchema,
	"products"
)

// --------------------------------------------------------------------------------------
