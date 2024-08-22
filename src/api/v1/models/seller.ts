import mongoose, { Schema, Types } from "mongoose"
import { Seller_t } from "./seller.types"

// --------------------------------------------------------------------------------------

const SellerMetadataSchema = new Schema({
	createdAt: { type: Number, required: true },
	createdBy: { type: String, required: true },
	updatedAt: { type: Number, required: true },
	updatedBy: { type: String, required: true },
})

const SellerAddressSchema = new Schema({
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

const SellerContactDetailsSchema = new Schema({
	email: { type: String, required: true },
	phoneNumber: { type: String, required: true },
})

const SellerInventorySchema = new Schema({}, { strict: false })

const SellerSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	metadata: { type: SellerMetadataSchema, required: true },
	name: { type: String, required: true },
	address: { type: SellerAddressSchema, required: true },
	contactDetails: { type: SellerContactDetailsSchema, required: true },
	inventory: { type: SellerInventorySchema, required: true },
})

// --------------------------------------------------------------------------------------

export const SellerModel = mongoose.model<Seller_t>(
	"seller",
	SellerSchema,
	"sellers"
)

// --------------------------------------------------------------------------------------
