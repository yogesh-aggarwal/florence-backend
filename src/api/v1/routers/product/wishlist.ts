import { Request, Response } from "express"
import { Document } from "mongoose"
import { getRequestingUser } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"
import { User_t } from "../../models/user.types"

export default async function getWishlistProducts(req: Request, res: Response) {
	const user: User_t | null = getRequestingUser(req)
	if (!user) {
		return res.status(404).json({ message: ResponseMessages.AUTH_INVALID })
	}

	const products: Document<Product_t>[] = await ProductModel.find({
		_id: { $in: user.data.wishlist },
	})
	const parsedProducts = products.map((product) => product.toObject())

	return res
		.status(200)
		.send({ message: ResponseMessages.SUCCESS, data: parsedProducts })
}
