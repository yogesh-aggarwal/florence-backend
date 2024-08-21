import mongoose, { Schema } from "mongoose"
import { User_t, UserAddressType } from "./user.types"

const UserMetadataSchema = new Schema({
	createdAt: { type: Number, required: true },
	updatedAt: { type: Number, required: true },
	isUpdated: { type: Boolean, required: true },
})

const UserAddressMetadataSchema = new Schema({
	createdAt: { type: Number, required: true },
	updatedAt: { type: Number, required: true },
	isUpdated: { type: Boolean, required: true },
})

const UserAddressSchema = new Schema({
	_id: { type: mongoose.Types.ObjectId, required: true },
	metadata: { type: UserAddressMetadataSchema, required: true },
	type: { type: String, enum: Object.values(UserAddressType), required: true },
	isDefault: { type: Boolean, required: true },
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

const UserDataSchema = new Schema({
	wishlist: { type: [String], required: true },
	deliveryAddresses: { type: [UserAddressSchema], required: true },
})

const UserSchema = new Schema({
	_id: { type: mongoose.Types.ObjectId, required: true },
	metadata: { type: UserMetadataSchema, required: true },
	dp: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	data: { type: UserDataSchema, required: true },
})

export const UserModel = mongoose.model<User_t>("user", UserSchema, "users")
