import { OrderPaymentDetailsQuotationTax_t } from "../../models/orders.types"
import { UserAddress_t } from "../../models/user.types"

export async function calculateOrderTaxesQuotation(
   amount: number,
   address: UserAddress_t
): Promise<OrderPaymentDetailsQuotationTax_t[]> {
   return []
}
