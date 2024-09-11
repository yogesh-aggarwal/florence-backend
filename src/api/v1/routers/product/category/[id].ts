import { Request, Response } from "express"
import { ResponseMessages } from "../../../core/messages"
import { ProductModel } from "../../../models/product"

// --------------------------------------------------------------------------------------

export default async function getProductsByCategory(req: Request, res: Response) {
   try {
      const id: string = req.params.id

      const products = await ProductModel.find({
         "details.categories": id,
      }).limit(30)
      const parsedProducts = products.map((product) => product.toObject())

      return res.status(200).send({ message: ResponseMessages.SUCCESS, data: parsedProducts })
   } catch {
      return res.status(500).send({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
   }
}

// --------------------------------------------------------------------------------------
