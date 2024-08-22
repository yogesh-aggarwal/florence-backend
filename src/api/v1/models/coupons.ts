import mongoose, { Schema } from "mongoose"
import { Coupon_t } from "./coupons.types"

// --------------------------------------------------------------------------------------

const CouponSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, required: true },
	code: { type: String, required: true },
	amount: { type: Number, required: false, default: null },
	percentage: { type: Number, required: false, default: null },
	maxAmount: { type: Number, required: false, default: null },
	minAmount: { type: Number, required: false, default: null },
	isActive: { type: Boolean, required: true },
	validFrom: { type: Number, required: false, default: null },
	validUntil: { type: Number, required: false, default: null },
	createdAt: { type: Number, required: true },
	createdBy: { type: String, required: true },
	updatedAt: { type: Number, required: true },
	updatedBy: { type: String, required: true },
	isUpdated: { type: Boolean, required: true },
	usersLimit: { type: Number, required: false, default: null },
	usersUsed: { type: Number, required: true },
	usedBy: { type: [String], required: true },
})

// --------------------------------------------------------------------------------------

export const CouponModel = mongoose.model<Coupon_t>(
	"coupon",
	CouponSchema,
	"coupons"
)

// --------------------------------------------------------------------------------------
