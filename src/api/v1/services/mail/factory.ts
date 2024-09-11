import { Mail_t } from "./mail.types"

function validated(data: Mail_t): Mail_t {
   const validate = Mail_t.safeParse(data)
   if (!validate.success) {
      throw new Error(validate.error.message)
   }

   return validate.data
}

export namespace MailFactory {
   export function orderPlaced(to: string, orderID: string): Mail_t {
      return validated({
         to,
         subject: `Order placed ${orderID}`,
         content: `Your order with order ID ${orderID} has been placed successfully.`,
      })
   }
}
