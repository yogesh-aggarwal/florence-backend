import { ObjectId } from "mongodb"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const OrderMetadata_t = z.object({
	createdBy: z.string(),
	createdAt: z.number(),

	editedAt: z.number(),
	editedBy: z.string(),
	isEdited: z.boolean(),
})
export type OrderMetadata_t = z.infer<typeof OrderMetadata_t>

// --------------------------------------------------------------------------------------

export enum OrderStatus {
	// Basics
	Placed = "Placed",
	Transit = "Transit",
	OutForDelivery = "OutForDelivery",

	// Special
	Pending = "Pending",
	Delayed = "Delayed",

	// Failures
	Returned = "Returned",
	Refunded = "Refunded",
	Retracted = "Retracted by user",
	Cancelled = "Cancelled",
}

// --------------------------------------------------------------------------------------

export const OrderPaymentDetails_t = z.object({
	razorpayPaymentID: z.string(),
	razorpaySignature: z.string(),
	recieptID: z.union([z.string(), z.null()]),
})
export type OrderPaymentDetails_t = z.infer<typeof OrderPaymentDetails_t>

// --------------------------------------------------------------------------------------

export const OrderTrackingStatus_t = z.object({
	timestamp: z.number(),
	status: z.nativeEnum(OrderStatus),
})
export type OrderTrackingStatus_t = z.infer<typeof OrderTrackingStatus_t>

// --------------------------------------------------------------------------------------

export const OrderTracking_t = z.object({
	currentStatus: z.nativeEnum(OrderStatus),
	history: z.array(OrderTrackingStatus_t),
})
export type OrderTracking_t = z.infer<typeof OrderTracking_t>

// --------------------------------------------------------------------------------------

export const OrderItems_t = z.object({
	id: z.string(),
	price: z.number(),
})
export type OrderItems_t = z.infer<typeof OrderItems_t>

// --------------------------------------------------------------------------------------

export const Order_t = z.object({
	_id: z.instanceof(ObjectId),
	metadata: OrderMetadata_t,

	tracking: OrderTracking_t,
	items: z.array(OrderItems_t),
	paymentDetails: OrderPaymentDetails_t,
})
export type Order_t = z.infer<typeof Order_t>

// --------------------------------------------------------------------------------------
