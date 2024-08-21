import { Request, Response } from "express"
import { ProductModel } from "../../../models/product"
import { Product_t } from "../../../models/product.types"

export default async function getProductsBySearch(req: Request, res: Response) {
	const query: string = req.params.query
	const product: Product_t | null = await ProductModel.findOne({
		title: { $regex: query },
	})
	res.status(200).send({
		message: "Product fetched",
		data: product,
	})
}
