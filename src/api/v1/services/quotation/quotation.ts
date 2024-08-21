import {
	OrderItem_t,
	OrderPaymentDetailsQuotation_t,
} from "../../models/orders.types"
import { UserAddress_t } from "../../models/user.types"
import { calculateOrderDeliveryQuotation } from "./delivery"
import { calculateOrderDiscountQuotation } from "./discount"
import { calculateOrderServicesQuotation } from "./services"
import { calculateOrderTaxesQuotation } from "./taxes"

export async function prepareOrderQuotation(
	address: UserAddress_t,
	orderItems: OrderItem_t[],
	appliedCoupon: string | null
): Promise<OrderPaymentDetailsQuotation_t> {
	/* Total amount of items */
	const itemsTotal = orderItems.reduce(
		(acc, x) => acc + x.price * x.quantity,
		0
	)

	/* Delivery charges */
	const delivery = await calculateOrderDeliveryQuotation(address)
	const deliveryTotal = delivery.total

	/* Service charges */
	const services = await calculateOrderServicesQuotation(itemsTotal)
	const servicesTotal = services.reduce((acc, x) => acc + x.amount, 0)

	/* Discounts */
	const discount = await calculateOrderDiscountQuotation(
		itemsTotal,
		appliedCoupon
	)
	const discountTotal = discount.amount

	/* Taxable amount */
	const netTaxable = itemsTotal + deliveryTotal + servicesTotal - discountTotal

	/* Taxes */
	const taxes = await calculateOrderTaxesQuotation(netTaxable, address)
	const taxesTotal = taxes.reduce((acc, x) => acc + x.amount, 0)

	/* Final amount after everything */
	const netAmount = netTaxable + taxesTotal

	/* Prepare the final quotation */
	const quotation: OrderPaymentDetailsQuotation_t = {
		items: itemsTotal,
		delivery: delivery,
		services: services,
		taxes: taxes,
		discount: discount,
		net: netAmount,
	}

	return quotation
}
