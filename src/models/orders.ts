import mongoose from "mongoose"

const OrderTimestampSchema = new mongoose.Schema({
	placed: Number,
	transit: Number,
	delivered: Number,
})

const OrderSchema = new mongoose.Schema({
	id: String,
	userID: String,
	razorpay_payment_id: String,
	razorpay_signature: String,
	orderItems: Object,
	timestamps: OrderTimestampSchema,
	currentStatus: {
		type: String,
		enum: ["placed", "transit", "delivered"],
	},
	priceItems: Object,
})

export const Order = mongoose.model("Order", OrderSchema)
