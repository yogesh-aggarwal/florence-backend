import { Request, Response } from "express"
import { ProductModel } from "../../../models/product"
import { Product_t } from "../../../models/product.types"

export default async function getProductsByCategory(
	req: Request,
	res: Response
) {
	const id: string = req.params.id
	const products: Product_t[] = await ProductModel.find({
		categories: { $elemMatch: { $eq: id } },
	}).limit(30)

	res.status(200).send({
		message: "products found",
		data: products,
	})
}
