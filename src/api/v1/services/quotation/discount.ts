import { CouponModel } from "../../models/coupons"
import { OrderPaymentDetailsQuotationDiscount_t } from "../../models/orders.types"

// --------------------------------------------------------------------------------------

async function applyCouponIfApplicable(
   amount: number,
   couponCode: string | null,
   userID: string
): Promise<OrderPaymentDetailsQuotationDiscount_t | null> {
   const coupon = await CouponModel.findOne({ code: couponCode })
   if (!coupon) return null
   if (
      // Coupon is not active
      !coupon.isActive ||
      // Coupon is not yet valid
      (coupon.validFrom && Date.now() < coupon.validFrom) ||
      // Coupon is expired
      (coupon.validUntil && Date.now() > coupon.validUntil) ||
      // Coupon has reached its usage limit
      (coupon.usersLimit && coupon.usersUsed >= coupon.usersLimit) ||
      // Coupon has already been used by the user
      coupon.usedBy.includes(userID) ||
      // Coupon's minimum amount requirement is not fulfilled
      (coupon.minAmount && amount < coupon.minAmount)
   ) {
      return null
   }

   // TODO: Might take off this part as we can't be sure whether the user's intent is to use the coupon or not
   await CouponModel.updateOne({ code: couponCode }, { $inc: { usersUsed: 1 }, $push: { usedBy: userID } })

   const discount: OrderPaymentDetailsQuotationDiscount_t = {
      amount: 0,
      percentage: 0,
      label: `Coupon discount: ${coupon.code}`,
   }

   if (coupon.percentage) {
      let discountedAmount = amount * (coupon.percentage / 100)
      if (coupon.maxAmount && discountedAmount > coupon.maxAmount) discountedAmount = coupon.maxAmount
      discount.amount = discountedAmount
   } else if (coupon.amount) {
      discount.amount = coupon.amount
      discount.percentage = -1
   }

   return discount
}

// --------------------------------------------------------------------------------------

export async function calculateOrderDiscountQuotation(
   amount: number,
   appliedCoupon: string | null,
   userID: string
): Promise<OrderPaymentDetailsQuotationDiscount_t[]> {
   const discounts: OrderPaymentDetailsQuotationDiscount_t[] = []

   // Platform grace discount
   discounts.push({
      amount: 20,
      percentage: -1,
      label: "Flat discount",
   })

   if (appliedCoupon) {
      const couponDiscount = await applyCouponIfApplicable(amount, appliedCoupon, userID)
      if (couponDiscount) discounts.push(couponDiscount)
   }

   return discounts
}

// --------------------------------------------------------------------------------------
