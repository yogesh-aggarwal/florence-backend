import { Request, Response } from "express"
import { CLOUD_RESOURCE_MANAGER } from "google-auth-library/build/src/auth/baseexternalclient"
import { Document } from "mongoose"
import { ResponseMessages } from "../../core/messages"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"

// --------------------------------------------------------------------------------------

export default async function getAllProducts(_: Request, res: Response) {
   const products: Document<Product_t>[] = await ProductModel.find({})
   const parsedProducts = products.map((product) => product.toObject())

   return res.status(200).send({ message: ResponseMessages.SUCCESS, data: parsedProducts })
}

// --------------------------------------------------------------------------------------
