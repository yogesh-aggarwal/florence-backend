import { Request, Response } from "express"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"
import { UserModel } from "../../models/user"
import { User_t } from "../../models/user.types"

export default async function getWishlistProducts(req: Request, res: Response) {
	const email: string = req.body["email"]
	const user: User_t | null = await UserModel.findOne({
		email: email,
	}).populate("wishlist")
	if (!user) {
		res.status(404).send({
			message: "User not found",
		})
		return
	}

	const products: Product_t[] = await ProductModel.find({
		id: { $in: user.wishlist },
	})
	let reqProducts: any[] = []
	for (let product of products) {
		let pro: any = {}
		pro["id"] = product._id.toString()
		pro["title"] = product.title
		pro["price"] = product.price
		pro["images"] = product.images

		reqProducts.push(pro)
	}

	res.status(200).send({
		message: "Products fetched",
		data: reqProducts,
	})
}
