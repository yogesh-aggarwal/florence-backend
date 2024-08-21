import { Request, Response } from "express"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"

export default async function getAllProducts(req: Request, res: Response) {
	const products: Product_t[] = await ProductModel.find({})
	res.status(200).send({
		message: "Products fetched",
		data: products,
	})
}
