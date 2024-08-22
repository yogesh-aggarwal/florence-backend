import mongoose from "mongoose"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const DeliveryPartnerMetadata_t = z.object({
	createdAt: z.number(),
	updatedAt: z.number(),

	isUpdated: z.boolean(),
})
export type DeliveryPartnerMetadata_t = z.infer<
	typeof DeliveryPartnerMetadata_t
>

// --------------------------------------------------------------------------------------

export const DeliveryPartnerAddressMetadata_t = z.object({
	createdAt: z.number(),
	updatedAt: z.number(),

	isUpdated: z.boolean(),
})
export type DeliveryPartnerAddressMetadata_t = z.infer<
	typeof DeliveryPartnerAddressMetadata_t
>

// --------------------------------------------------------------------------------------

export const DeliveryPartnerAddress_t = z.object({
	_id: z.instanceof(mongoose.Types.ObjectId),
	metadata: DeliveryPartnerAddressMetadata_t,

	city: z.string(),
	state: z.string(),
	country: z.string(),
	pincode: z.string(),
	landmark: z.string(),
	address: z.string(),
	phoneNumber: z.string(),

	latitude: z.number(),
	longitude: z.number(),
})
export type DeliveryPartnerAddress_t = z.infer<typeof DeliveryPartnerAddress_t>

// --------------------------------------------------------------------------------------

export const DeliveryPartnerData_t = z.object({})
export type DeliveryPartnerData_t = z.infer<typeof DeliveryPartnerData_t>

// --------------------------------------------------------------------------------------

export const DeliveryPartner_t = z.object({
	_id: z.instanceof(mongoose.Types.ObjectId),
	metadata: DeliveryPartnerMetadata_t,

	dp: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),

	data: DeliveryPartnerData_t,
})
export type DeliveryPartner_t = z.infer<typeof DeliveryPartner_t>

// --------------------------------------------------------------------------------------
