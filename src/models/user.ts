import mongoose from "mongoose"
import { User_t, UserAddress_t } from "./user.types"

const Address = new mongoose.Schema<UserAddress_t>({
	address: {
		type: String,
		trim: true,
		required: true,
	},
	city: {
		type: String,
		trim: true,
		required: true,
	},
	pincode: {
		type: String,
		trim: true,
		required: true,
		minLength: 6,
	},
})

const UserSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		lowercase: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
	password: {
		type: String,
		trim: true,
	},
	name: {
		type: String,
		trim: true,
		minLength: 4,
		required: true,
	},
	viewHistory: [
		{
			type: String,
		},
	],
	// deliveryAddresses: [Address],
	deliveryAddresses: [{ type: Address }],
	mobileNumbers: [
		{
			type: String,
			trim: true,
			minLength: 10,
			required: true,
		},
	],
	dp: {
		type: String,
		trim: true,
	},
	wishlist: [
		{
			type: String,
			trim: true,
		},
	],
})

export const User = mongoose.model<User_t>("users", UserSchema)
