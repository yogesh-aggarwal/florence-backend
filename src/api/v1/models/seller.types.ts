import { Types } from "mongoose"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const SellerMetadata_t = z.object({
	createdAt: z.number(),
	createdBy: z.string(),
	updatedAt: z.number(),
	updatedBy: z.string(),
})
export type SellerMetadata_t = z.infer<typeof SellerMetadata_t>

// --------------------------------------------------------------------------------------

export const SellerAddress_t = z.object({
	city: z.string(),
	state: z.string(),
	country: z.string(),
	pincode: z.string(),
	landmark: z.string(),
	address: z.string(),

	latitude: z.number(),
	longitude: z.number(),
})
export type SellerAddress_t = z.infer<typeof SellerAddress_t>

// --------------------------------------------------------------------------------------

export const SellerContactDetails_t = z.object({
	email: z.string(),
	phoneNumber: z.string(),
})
export type SellerContactDetails_t = z.infer<typeof SellerContactDetails_t>

// --------------------------------------------------------------------------------------

export const SellerInventory_t = z.record(z.number())
export type SellerInventory_t = z.infer<typeof SellerInventory_t>

// --------------------------------------------------------------------------------------

export const Seller_t = z.object({
	_id: z.instanceof(Types.ObjectId),
	metadata: SellerMetadata_t,

	name: z.string(),
	address: SellerAddress_t,
	contactDetails: SellerContactDetails_t,

	inventory: SellerInventory_t,
})
export type Seller_t = z.infer<typeof Seller_t>

// --------------------------------------------------------------------------------------
