import { Request, Response } from "express"
import { ResponseMessages } from "../../core/messages"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"
import { UserModel } from "../../models/user"
import { User_t } from "../../models/user.types"
import { UserViewHistoryModel } from "../../models/userViewHistory"

export default async function getProductByID(req: Request, res: Response) {
	const user = (req as any)["user"] as User_t | undefined

	const product: Product_t | null = await ProductModel.findOne({
		id: { $eq: req.params.id },
	})
	if (!product) {
		return res.status(404).send({
			message: ResponseMessages.INVALID_RESOURCE_ID,
		})
	}

	if (user) {
		const viewHistory = await UserViewHistoryModel.findOne({
			userID: user._id,
		})
		if (!viewHistory) {
			// create one
		}
		const check: boolean = viewHistory.includes(req.params.id)
		if (!check) {
			if (viewHistory.length >= 5) {
				viewHistory.shift()
			}
			viewHistory.push(req.params.id)

			await UserModel.updateOne(
				{ email: email },
				{ $set: { viewHistory: viewHistory } }
			)
		}
	}
	res.status(200).send({
		message: "Product fetched",
		data: product,
	})
}
