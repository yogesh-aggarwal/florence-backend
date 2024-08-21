import { OrderPaymentDetailsQuotationDiscount_t } from "../../models/orders.types"

export async function calculateOrderDiscountQuotation(
	amount: number,
	coupon: string | null
): Promise<OrderPaymentDetailsQuotationDiscount_t> {
	const quotation: OrderPaymentDetailsQuotationDiscount_t = {
		amount: 0,
		percentage: 0,
		label: "",
	}

	return quotation
}
