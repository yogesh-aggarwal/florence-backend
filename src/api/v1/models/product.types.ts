import { ObjectId } from "mongodb"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const ProductMetadata_t = z.object({
   createdBy: z.string(),
   createdAt: z.number(),

   editedAt: z.number(),
   editedBy: z.string(),
   isEdited: z.boolean(),

   isActive: z.boolean(),
   isDeleted: z.boolean(),
})
export type ProductMetadata_t = z.infer<typeof ProductMetadata_t>

// --------------------------------------------------------------------------------------

export const ProductDescriptionItem_t = z.object({
   type: z.enum(["para", "list"]),
   content: z.union([z.string(), z.array(z.any())]),
})
export type ProductDescriptionItem_t = z.infer<typeof ProductDescriptionItem_t>

// --------------------------------------------------------------------------------------

export const ProductDetails_t = z.object({
   stock: z.number(),
   tags: z.array(z.string()),
   categories: z.array(z.string()),

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
   metadata: ProductMetadata_t,

   title: z.string(),
   price: z.number(),
   images: z.array(z.string()),

   stats: ProductStats_t,
   details: ProductDetails_t,
   costing: ProductCosting_t,
})
export type Product_t = z.infer<typeof Product_t>

// --------------------------------------------------------------------------------------
