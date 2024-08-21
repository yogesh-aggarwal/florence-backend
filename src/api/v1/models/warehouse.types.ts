import { Types } from "mongoose"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const WarehouseMetadata_t = z.object({
	createdAt: z.number(),
	createdBy: z.string(),
	updatedAt: z.number(),
	updatedBy: z.string(),
})
export type WarehouseMetadata_t = z.infer<typeof WarehouseMetadata_t>

// --------------------------------------------------------------------------------------

export const WarehouseAddress_t = z.object({
	city: z.string(),
	state: z.string(),
	country: z.string(),
	pincode: z.string(),
	landmark: z.string(),
	address: z.string(),

	latitude: z.number(),
	longitude: z.number(),
})
export type WarehouseAddress_t = z.infer<typeof WarehouseAddress_t>

// --------------------------------------------------------------------------------------

export const WarehouseContactDetails_t = z.object({
	email: z.string(),
	phoneNumber: z.string(),
})
export type WarehouseContactDetails_t = z.infer<
	typeof WarehouseContactDetails_t
>

// --------------------------------------------------------------------------------------

export const WarehouseInventory_t = z.record(z.number())
export type WarehouseInventory_t = z.infer<typeof WarehouseInventory_t>

// --------------------------------------------------------------------------------------

export const Warehouse_t = z.object({
	_id: z.instanceof(Types.ObjectId),
	metadata: WarehouseMetadata_t,

	name: z.string(),
	address: WarehouseAddress_t,
	contactDetails: WarehouseContactDetails_t,

	inventory: WarehouseInventory_t,
})
export type Warehouse_t = z.infer<typeof Warehouse_t>

// --------------------------------------------------------------------------------------
