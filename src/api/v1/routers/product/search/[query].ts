import { Request, Response } from "express"
import { ResponseMessages } from "../../../core/messages"
import { ProductModel } from "../../../models/product"
import { Product_t } from "../../../models/product.types"

// --------------------------------------------------------------------------------------

export default async function getProductsBySearch(req: Request, res: Response) {
   const query: string = req.params.query

   /**
    * TODO:
    *
    * Don't allow regex like that it might cause the DB to crash
    * if the user has provided some malicious input like:
    *
    * 1. /./
    * 2. /a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/
    * 3. /a{1000}/
    * etc
    */
   const product: Product_t | null = await ProductModel.findOne({
      title: { $regex: query },
   })

   return res.status(200).send({ message: ResponseMessages.SUCCESS, data: product })
}

// --------------------------------------------------------------------------------------
