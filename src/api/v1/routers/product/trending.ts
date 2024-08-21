import { Request, Response } from "express"
import { ResponseMessages } from "../../core/messages"
import { ProductModel } from "../../models/product"

// --------------------------------------------------------------------------------------

export default async function getTrendingProducts(req: Request, res: Response) {
	const products = await ProductModel.find({}).limit(30)
	const parsedProducts = products.map((product) => product.toObject())

	return res
		.status(200)
		.send({ message: ResponseMessages.SUCCESS, data: parsedProducts })
}

// --------------------------------------------------------------------------------------
