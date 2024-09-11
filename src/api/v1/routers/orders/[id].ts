import { Request, Response } from "express"
import { OrderModel } from "../../models/orders"

// --------------------------------------------------------------------------------------

export default async function getOrderByID(req: Request, res: Response) {
   const id = req.params.id
   let order = await OrderModel.findOne({ id: { $eq: id } })
   res.status(200).send({ order: order })
}

// --------------------------------------------------------------------------------------
