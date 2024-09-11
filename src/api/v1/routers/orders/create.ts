import { Request, Response } from "express"
import Razorpay from "razorpay"
import { z } from "zod"
import { RAZORPAY_KEY_ID, RAZORPAY_SECRET } from "../../../../core/constants"
import { generateNanoidOnlyAlphabets } from "../../../../core/utils"
import { parseRequestBody } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"

// --------------------------------------------------------------------------------------

const bodySchema = z.object({
   amount: z.number().positive("Amount must be positive"),
})

// --------------------------------------------------------------------------------------

export default async function createOrder(req: Request, res: Response) {
   try {
      const body = parseRequestBody<z.infer<typeof bodySchema>>(req, bodySchema)
      if (!body) {
         return res.status(400).send({ message: ResponseMessages.INVALID_BODY_CONTENT })
      }

      const instance = new Razorpay({
         key_id: RAZORPAY_KEY_ID,
         key_secret: RAZORPAY_SECRET,
      })

      const receiptID = `receipt#${generateNanoidOnlyAlphabets(8)}`
      const order = await instance.orders.create({
         currency: "INR",
         receipt: receiptID,
         amount: body.amount,
      })

      return res.status(200).send({
         message: ResponseMessages.SUCCESS,
         data: order,
      })
   } catch {
      return res.status(500).send({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
   }
}

// --------------------------------------------------------------------------------------
