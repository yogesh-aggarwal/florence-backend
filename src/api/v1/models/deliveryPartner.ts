import mongoose, { Schema } from "mongoose"
import { DeliveryPartner_t } from "./deliveryPartner.types"

const DeliveryPartnerMetadataSchema = new Schema({
	createdAt: { type: Number, required: true },
	updatedAt: { type: Number, required: true },
	isUpdated: { type: Boolean, required: true },
})

const DeliveryPartnerAddressMetadataSchema = new Schema({
	createdAt: { type: Number, required: true },
	updatedAt: { type: Number, required: true },
	isUpdated: { type: Boolean, required: true },
})

const DeliveryPartnerAddressSchema = new Schema({
	_id: { type: mongoose.Types.ObjectId, required: true },
	metadata: { type: DeliveryPartnerAddressMetadataSchema, required: true },
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

const DeliveryPartnerDataSchema = new Schema({})

const DeliveryPartnerSchema = new Schema({
	_id: { type: mongoose.Types.ObjectId, required: true },
	metadata: { type: DeliveryPartnerMetadataSchema, required: true },
	dp: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	data: { type: DeliveryPartnerDataSchema, required: true },
})

export const DeliveryPartnerModel = mongoose.model<DeliveryPartner_t>(
	"deliveryPartner",
	DeliveryPartnerSchema,
	"deliveryPartners"
)
