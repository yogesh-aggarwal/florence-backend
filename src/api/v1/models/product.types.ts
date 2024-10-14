import { z } from "zod"

// --------------------------------------------------------------------------------------

export const ProductMetadata_t = z.object({
   created_at: z.number(),
   updated_at: z.number(),
   published_at: z.number().nullable(),
   unpublished_at: z.number().nullable(),
   reviewed_at: z.number().nullable(),
   released_at: z.number().nullable(),
   expiration_date: z.number().nullable(),
})
export type ProductMetadata_t = z.infer<typeof ProductMetadata_t>

// --------------------------------------------------------------------------------------

export const ProductMediaImage_t = z.object({
   url: z.string(),
   alt_text: z.string(),
})
export type ProductMediaImage_t = z.infer<typeof ProductMediaImage_t>

// --------------------------------------------------------------------------------------

export const ProductMediaVideo_t = z.object({
   url: z.string(),
   description: z.string(),
})
export type ProductMediaVideo_t = z.infer<typeof ProductMediaVideo_t>

// --------------------------------------------------------------------------------------

export const ProductMedia_t = z.object({
   images: z.array(ProductMediaImage_t),
   videos: z.array(ProductMediaVideo_t),
})
export type ProductMedia_t = z.infer<typeof ProductMedia_t>

// --------------------------------------------------------------------------------------

export const ProductListingSEO_t = z.object({
   meta_title: z.string(),
   meta_description: z.string(),
   meta_keywords: z.string(),
   canonical_url: z.string(),
})
export type ProductListingSEO_t = z.infer<typeof ProductListingSEO_t>

// --------------------------------------------------------------------------------------

export const ProductListingDescription_t = z.object({
   short: z.string(),
   long: z.string(),
})
export type ProductListingDescription_t = z.infer<typeof ProductListingDescription_t>

// --------------------------------------------------------------------------------------

export const ProductListingCategories_t = z.object({
   primary: z.string(),
   secondary: z.string(),
   subcategory: z.string(),
})
export type ProductListingCategories_t = z.infer<typeof ProductListingCategories_t>

// --------------------------------------------------------------------------------------

export const ProductListingStatus_t = z.object({
   availability: z.string(),
   lifecycle: z.string(),
   featured: z.boolean(),
   on_sale: z.boolean(),
})
export type ProductListingStatus_t = z.infer<typeof ProductListingStatus_t>

// --------------------------------------------------------------------------------------

export const ProductDetailsLegal_t = z.object({
   warranty_info: z.string(),
   return_policy: z.string(),
})
export type ProductDetailsLegal_t = z.infer<typeof ProductDetailsLegal_t>

// --------------------------------------------------------------------------------------

export const ProductDetailsAttribute_t = z.object({
   name: z.string(),
   value: z.string(),
})
export type ProductDetailsAttribute_t = z.infer<typeof ProductDetailsAttribute_t>

// --------------------------------------------------------------------------------------

export const ProductDetails_t = z.object({
   brand: z.string(),
   model: z.string(),
   condition: z.string(),
   clearance: z.boolean(),
   legal: ProductDetailsLegal_t,
   attributes: z.array(ProductDetailsAttribute_t),
})
export type ProductDetails_t = z.infer<typeof ProductDetails_t>

// --------------------------------------------------------------------------------------

export const ProductReviews_t = z.object({
   total_count: z.number(),
   average_rating: z.number(),
   star_distribution: z.object({
      1: z.number(),
      2: z.number(),
      3: z.number(),
      4: z.number(),
      5: z.number(),
   }),
})
export type ProductReviews_t = z.infer<typeof ProductReviews_t>

// --------------------------------------------------------------------------------------

export const Product_t = z.object({
   _id: z.string(),
   metadata: ProductMetadata_t,
   media: ProductMedia_t,
   listing: z.object({
      sku: z.string(),
      seo: ProductListingSEO_t,
      title: z.string(),
      description: ProductListingDescription_t,
      categories: ProductListingCategories_t,
      tags: z.array(z.string()),
      status: ProductListingStatus_t,
   }),
   details: ProductDetails_t,
   variants: z.array(z.string()),
   reviews: ProductReviews_t,
   price: z.number(),
})
export type Product_t = z.infer<typeof Product_t>

// --------------------------------------------------------------------------------------
