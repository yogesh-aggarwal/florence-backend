import mongoose, { Schema, Types } from "mongoose"

// --------------------------------------------------------------------------------------

const WarehouseMetadataSchema = new Schema({
	createdAt: { type: Number, required: true },
	createdBy: { type: String, required: true },
	updatedAt: { type: Number, required: true },
	updatedBy: { type: String, required: true },
})

const WarehouseAddressSchema = new Schema({
	city: { type: String, required: true },
	state: { type: String, required: true },
	country: { type: String, required: true },
	pincode: { type: String, required: true },
	landmark: { type: String, required: true },
	address: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
})

const WarehouseContactDetailsSchema = new Schema({
	email: { type: String, required: true },
	phoneNumber: { type: String, required: true },
})

const WarehouseInventorySchema = new Schema({}, { strict: false })

const WarehouseSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	metadata: { type: WarehouseMetadataSchema, required: true },
	name: { type: String, required: true },
	address: { type: WarehouseAddressSchema, required: true },
	contactDetails: { type: WarehouseContactDetailsSchema, required: true },
	inventory: { type: WarehouseInventorySchema, required: true },
})

// --------------------------------------------------------------------------------------

export const WarehouseModel = mongoose.model(
	"warehouse",
	WarehouseSchema,
	"warehouses"
)

// --------------------------------------------------------------------------------------
