import { OrderPaymentDetailsQuotationDelivery_t } from "../../models/orders.types"
import { UserAddress_t } from "../../models/user.types"

export async function calculateOrderDeliveryQuotation(
	address: UserAddress_t
): Promise<OrderPaymentDetailsQuotationDelivery_t> {
	const quotation: OrderPaymentDetailsQuotationDelivery_t = {
		base: 0,
		additional: 0,
		total: 0,
	}

	return quotation
}
