import mongoose from "mongoose"

export type UserAddress_t = {
	address: string
	city: string
	pincode: string
}

export type User_t = {
	_id: mongoose.Types.ObjectId
	email: string
	password: string
	name: string
	viewHistory: string[]
	deliveryAddresses: UserAddress_t[]
	mobileNumbers: string[]
	dp: string
	wishlist: string[]
}
