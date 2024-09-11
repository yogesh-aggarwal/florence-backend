import { Request, Response } from "express"
import { ResponseMessages } from "../../core/messages"
import { OrderModel } from "../../models/orders"

// --------------------------------------------------------------------------------------

export default async function getOrderByID(req: Request, res: Response) {
   try {
      const id = req.params.id
      let order = await OrderModel.findOne({ id: { $eq: id } })
      res.status(200).send({ order: order })
   } catch {
      return res.status(500).send({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
   }
}

// --------------------------------------------------------------------------------------
