import { Request, Response } from "express"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"

export default async function getProductsByIDS(req: Request, res: Response) {
	const ids: string[] = req.body["ids"]

	const products: Product_t[] = await ProductModel.find({ id: { $in: ids } })
	let reqProducts: any[] = []
	for (let product of products) {
		let pro: any = {}
		pro["title"] = product.title
		pro["image"] = product.images[0]
		pro["id"] = product._id.toString()

		reqProducts.push(pro)
	}

	res.status(200).send({
		message: "Products fetched",
		data: reqProducts,
	})
}
