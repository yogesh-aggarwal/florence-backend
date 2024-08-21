import { ObjectId } from "mongodb"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const ProductDescriptionItem_t = z.object({
	type: z.enum(["para", "list"]),
	content: z.union([z.string(), z.array(z.any())]),
})
export type ProductDescriptionItem_t = z.infer<typeof ProductDescriptionItem_t>

// --------------------------------------------------------------------------------------

export const ProductDetails_t = z.object({
	stock: z.number(),
	description: z.array(ProductDescriptionItem_t),
	deliveryInfo: z.array(ProductDescriptionItem_t),
	careInstructions: z.array(ProductDescriptionItem_t),
})
export type ProductDetails_t = z.infer<typeof ProductDetails_t>

// --------------------------------------------------------------------------------------

export const ProductStats_t = z.object({
	views: z.number(),
	starRatings: z.number(),
	reviewsCount: z.number(),
})
export type ProductStats_t = z.infer<typeof ProductStats_t>

// --------------------------------------------------------------------------------------

export const ProductCosting_t = z.object({
	originalPrice: z.number(),
	discountInPercent: z.number(),
	baseDeliveryCharges: z.number(),
})
export type ProductCosting_t = z.infer<typeof ProductCosting_t>

// --------------------------------------------------------------------------------------

export const Product_t = z.object({
	_id: z.instanceof(ObjectId),
	title: z.string(),
	price: z.number(),
	images: z.array(z.string()),

	details: ProductDetails_t,
	stats: ProductStats_t,
	costing: ProductCosting_t,
})
export type Product_t = z.infer<typeof Product_t>

// --------------------------------------------------------------------------------------
