import { ObjectId } from "mongodb"
import { z } from "zod"

// --------------------------------------------------------------------------------------

export const OrderMetadata_t = z.object({
   createdBy: z.string(),
   createdAt: z.number(),

   editedAt: z.number(),
   editedBy: z.union([z.string(), z.null()]),
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

export const OrderPaymentDetailsQuotationDelivery_t = z.object({
   base: z.number(),
   additional: z.number(),
   total: z.number(),
})
export type OrderPaymentDetailsQuotationDelivery_t = z.infer<typeof OrderPaymentDetailsQuotationDelivery_t>

// --------------------------------------------------------------------------------------

export const OrderPaymentDetailsQuotationServices_t = z.object({
   label: z.string(),
   amount: z.number(),
})
export type OrderPaymentDetailsQuotationServices_t = z.infer<typeof OrderPaymentDetailsQuotationServices_t>

// --------------------------------------------------------------------------------------

export const OrderPaymentDetailsQuotationDiscount_t = z.object({
   label: z.string(),
   percentage: z.number(),
   amount: z.number(),
})
export type OrderPaymentDetailsQuotationDiscount_t = z.infer<typeof OrderPaymentDetailsQuotationDiscount_t>

// --------------------------------------------------------------------------------------

export const OrderPaymentDetailsQuotationTax_t = z.object({
   label: z.string(),
   percentage: z.number(),
   amount: z.number(),
})
export type OrderPaymentDetailsQuotationTax_t = z.infer<typeof OrderPaymentDetailsQuotationTax_t>

// --------------------------------------------------------------------------------------

export const OrderPaymentDetailsQuotation_t = z.object({
   items: z.number(),
   delivery: OrderPaymentDetailsQuotationDelivery_t,
   services: z.array(OrderPaymentDetailsQuotationServices_t),
   discounts: z.array(OrderPaymentDetailsQuotationDiscount_t),
   taxes: z.array(OrderPaymentDetailsQuotationTax_t),

   net: z.number(),
})
export type OrderPaymentDetailsQuotation_t = z.infer<typeof OrderPaymentDetailsQuotation_t>

// --------------------------------------------------------------------------------------

export const OrderPaymentDetails_t = z.object({
   recieptID: z.union([z.string(), z.null()]),

   quotation: OrderPaymentDetailsQuotation_t,

   razorpayPaymentID: z.string(),
   razorpaySignature: z.string(),
})
export type OrderPaymentDetails_t = z.infer<typeof OrderPaymentDetails_t>

// --------------------------------------------------------------------------------------

export const OrderTrackingStatus_t = z.object({
   timestamp: z.number(),
   message: z.union([z.string(), z.null()]),
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

export const OrderItem_t = z.object({
   id: z.string(),
   quantity: z.number(),
   price: z.number(),
})
export type OrderItem_t = z.infer<typeof OrderItem_t>

// --------------------------------------------------------------------------------------

export const Order_t = z.object({
   _id: z.instanceof(ObjectId),
   metadata: OrderMetadata_t,

   orderID: z.string(),

   tracking: OrderTracking_t,
   items: z.array(OrderItem_t),
   paymentDetails: OrderPaymentDetails_t,
})
export type Order_t = z.infer<typeof Order_t>

// --------------------------------------------------------------------------------------
