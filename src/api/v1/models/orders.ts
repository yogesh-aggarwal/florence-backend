import mongoose from "mongoose"
import { Order_t } from "./orders.types"

const OrderTimestampSchema = new mongoose.Schema({
	placed: Number,
	transit: Number,
	delivered: Number,
})

const OrderSchema = new mongoose.Schema({
	id: String,
	userID: String,
	razorpayTransactionID: String,
	razorpaySignature: String,
	orderItems: Object,
	timestamps: OrderTimestampSchema,
	currentStatus: {
		type: String,
		enum: ["placed", "transit", "delivered"],
	},
	priceItems: Object,
})

export const Order = mongoose.model<Order_t>("Order", OrderSchema)
