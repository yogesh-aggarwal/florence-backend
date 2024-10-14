import mongoose, { Schema, Document } from "mongoose"
import {
   ProductMetadata_t,
   ProductMediaImage_t,
   ProductMediaVideo_t,
   ProductMedia_t,
   ProductListingSEO_t,
   ProductListingDescription_t,
   ProductListingCategories_t,
   ProductListingStatus_t,
   ProductDetailsLegal_t,
   ProductDetailsAttribute_t,
   ProductDetails_t,
   ProductReviews_t,
   Product_t,
} from "./product.types" // Import your types here

// --------------------------------------------------------------------------------------

export const ProductMetadataSchema: Schema<ProductMetadata_t> = new Schema({
   created_at: { type: Number, required: true },
   updated_at: { type: Number, required: true },
   published_at: { type: Number, required: false, default: null },
   unpublished_at: { type: Number, required: false, default: null },
   reviewed_at: { type: Number, required: false, default: null },
   released_at: { type: Number, required: false, default: null },
   expiration_date: { type: Number, required: false, default: null },
})

// --------------------------------------------------------------------------------------

export const ProductMediaImageSchema: Schema<ProductMediaImage_t> = new Schema({
   url: { type: String, required: true },
   alt_text: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductMediaVideoSchema: Schema<ProductMediaVideo_t> = new Schema({
   url: { type: String, required: true },
   description: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductMediaSchema: Schema<ProductMedia_t> = new Schema({
   images: { type: [ProductMediaImageSchema], required: true },
   videos: { type: [ProductMediaVideoSchema], required: true },
})

// --------------------------------------------------------------------------------------

export const ProductListingSEOSchema: Schema<ProductListingSEO_t> = new Schema({
   meta_title: { type: String, required: true },
   meta_description: { type: String, required: true },
   meta_keywords: { type: String, required: true },
   canonical_url: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductListingDescriptionSchema: Schema<ProductListingDescription_t> = new Schema({
   short: { type: String, required: true },
   long: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductListingCategoriesSchema: Schema<ProductListingCategories_t> = new Schema({
   primary: { type: String, required: true },
   secondary: { type: String, required: true },
   subcategory: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductListingStatusSchema: Schema<ProductListingStatus_t> = new Schema({
   availability: { type: String, required: true },
   lifecycle: { type: String, required: true },
   featured: { type: Boolean, required: true },
   on_sale: { type: Boolean, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductDetailsLegalSchema: Schema<ProductDetailsLegal_t> = new Schema({
   warranty_info: { type: String, required: true },
   return_policy: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductDetailsAttributeSchema: Schema<ProductDetailsAttribute_t> = new Schema({
   name: { type: String, required: true },
   value: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductDetailsSchema: Schema<ProductDetails_t> = new Schema({
   brand: { type: String, required: true },
   model: { type: String, required: true },
   condition: { type: String, required: true },
   clearance: { type: Boolean, required: true },
   legal: { type: ProductDetailsLegalSchema, required: true },
   attributes: { type: [ProductDetailsAttributeSchema], required: true },
})

// --------------------------------------------------------------------------------------

export const ProductReviewsSchema: Schema<ProductReviews_t> = new Schema({
   average_rating: { type: Number, required: true },
   total_count: { type: Number, required: true },
   star_distribution: {
      1: { type: Number, required: true },
      2: { type: Number, required: true },
      3: { type: Number, required: true },
      4: { type: Number, required: true },
      5: { type: Number, required: true },
   },
})

// --------------------------------------------------------------------------------------

export const ProductSchema: Schema<Product_t> = new Schema({
   _id: { type: String, required: true },
   metadata: { type: ProductMetadataSchema, required: true },
   media: { type: ProductMediaSchema, required: true },
   listing: {
      sku: { type: String, required: true },
      seo: { type: ProductListingSEOSchema, required: true },
      title: { type: String, required: true },
      description: { type: ProductListingDescriptionSchema, required: true },
      categories: { type: ProductListingCategoriesSchema, required: true },
      tags: { type: [String], required: true },
      status: { type: ProductListingStatusSchema, required: true },
   },
   details: { type: ProductDetailsSchema, required: true },
   variants: { type: [String], required: true },
   reviews: { type: ProductReviewsSchema, required: true },
   price: { type: Number, required: true },
})

// --------------------------------------------------------------------------------------

export const ProductModel = mongoose.model<Product_t>("product", ProductSchema, "products")

// --------------------------------------------------------------------------------------
