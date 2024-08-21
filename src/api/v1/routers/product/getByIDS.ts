import { Request, Response } from "express"
import { Document } from "mongoose"
import { ResponseMessages } from "../../core/messages"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"

// --------------------------------------------------------------------------------------

export default async function getProductsByIDS(req: Request, res: Response) {
	const ids: string[] = req.body["ids"]

	// TODO: View counting here? Do we need to increase the view count of the product?
	const products: Document<Product_t>[] = await ProductModel.find({
		_id: { $in: ids },
	})
	const parsedProducts = products.map((product) => product.toObject())

	return res
		.status(200)
		.send({ message: ResponseMessages.SUCCESS, data: parsedProducts })
}

// --------------------------------------------------------------------------------------
