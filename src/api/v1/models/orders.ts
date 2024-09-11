import mongoose, { Schema } from "mongoose"
import { Order_t, OrderStatus } from "./orders.types"

const OrderMetadataSchema = new Schema({
   createdBy: { type: String, required: true },
   createdAt: { type: Number, required: true },
   editedAt: { type: Number, required: true },
   editedBy: { type: String, required: false, default: null },
   isEdited: { type: Boolean, required: true },
})

const OrderPaymentDetailsQuotationDeliverySchema = new Schema({
   base: { type: Number, required: true },
   additional: { type: Number, required: true },
   total: { type: Number, required: true },
})

const OrderPaymentDetailsQuotationServicesSchema = new Schema({
   label: { type: String, required: true },
   amount: { type: Number, required: true },
})

const OrderPaymentDetailsQuotationDiscountSchema = new Schema({
   label: { type: String, required: true },
   percentage: { type: Number, required: true },
   amount: { type: Number, required: true },
})

const OrderPaymentDetailsQuotationTaxSchema = new Schema({
   label: { type: String, required: true },
   percentage: { type: Number, required: true },
   amount: { type: Number, required: true },
})

const OrderPaymentDetailsQuotationSchema = new Schema({
   items: { type: Number, required: true },
   delivery: {
      type: OrderPaymentDetailsQuotationDeliverySchema,
      required: true,
   },
   services: {
      type: [OrderPaymentDetailsQuotationServicesSchema],
      required: true,
   },
   discounts: {
      type: [OrderPaymentDetailsQuotationDiscountSchema],
      required: true,
   },
   taxes: { type: [OrderPaymentDetailsQuotationTaxSchema], required: true },
   net: { type: Number, required: true },
})

const OrderPaymentDetailsSchema = new Schema({
   recieptID: { type: String, required: false, default: null },
   quotation: { type: OrderPaymentDetailsQuotationSchema, required: true },
   razorpayPaymentID: { type: String, required: true },
   razorpaySignature: { type: String, required: true },
})

const OrderTrackingStatusSchema = new Schema({
   timestamp: { type: Number, required: true },
   message: { type: String, required: false, default: null },
   status: { type: String, enum: OrderStatus, required: true },
})

const OrderTrackingSchema = new Schema({
   currentStatus: {
      type: String,
      enum: OrderStatus,
      required: true,
   },
   history: { type: [OrderTrackingStatusSchema], required: true },
})

const OrderItemSchema = new Schema({
   id: { type: String, required: true },
   quantity: { type: Number, required: true },
   price: { type: Number, required: true },
})

const OrderSchema = new Schema({
   _id: { type: mongoose.Types.ObjectId, required: true },
   metadata: { type: OrderMetadataSchema, required: true },

   orderID: { type: String, required: true },

   tracking: { type: OrderTrackingSchema, required: true },
   items: { type: [OrderItemSchema], required: true },
   paymentDetails: { type: OrderPaymentDetailsSchema, required: true },
})

// --------------------------------------------------------------------------------------

export const OrderModel = mongoose.model<Order_t>("order", OrderSchema, "orders")

// --------------------------------------------------------------------------------------
