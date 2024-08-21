import mongoose, { model, Schema } from "mongoose"
import { Order_t, OrderStatus } from "./orders.types"

// --------------------------------------------------------------------------------------

const OrderPaymentDetailsSchema = new Schema({
	razorpayPaymentID: { type: String, required: true },
	razorpaySignature: { type: String, required: true },
})

const OrderTrackingStatusSchema = new Schema({
	timestamp: { type: Number, required: true },
	status: { type: String, enum: Object.values(OrderStatus), required: true },
})

const OrderTrackingSchema = new Schema({
	currentStatus: {
		type: String,
		enum: Object.values(OrderStatus),
		required: true,
	},
	history: { type: [OrderTrackingStatusSchema], required: true },
})

const OrderItemsSchema = new Schema({
	id: { type: String, required: true },
	price: { type: Number, required: true },
})

const OrderSchema = new Schema({
	_id: { type: mongoose.Types.ObjectId, required: true },
	userID: { type: String, required: true },
	paymentDetails: { type: OrderPaymentDetailsSchema, required: true },
	tracking: { type: OrderTrackingSchema, required: true },
	items: { type: [OrderItemsSchema], required: true },
})

// --------------------------------------------------------------------------------------

export const OrderModel = model<Order_t>("order", OrderSchema, "orders")

// --------------------------------------------------------------------------------------
