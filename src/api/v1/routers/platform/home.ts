import { Request, Response } from "express"
import { ResponseMessages } from "../../core/messages"
import { PlatformModel } from "../../models/platform"
import { PlatformHomeSection_t } from "../../models/platform.types"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"
import { UserModel } from "../../models/user"

// --------------------------------------------------------------------------------------

export default async function getPlatformHomeData(req: Request, res: Response) {
	try {
		const data: PlatformHomeSection_t | null = await PlatformModel.findOne({
			id: "home",
		})
		if (!data) {
			return res
				.status(500)
				.send({ error: ResponseMessages.INTERNAL_SERVER_ERROR })
		}

		let response: Record<string, Record<string, Product_t[]>> = {}
		for (const { name, productIds } of Object.values(data.sections)) {
			let categories: Record<string, Product_t[]> = {}
			for (let category of productIds) {
				const ids = Object.values(category)[0]
				const categoryName = Object.keys(category)[0]

				const products = await ProductModel.find({ id: { $in: ids } })
				let arr = []
				for (let product of products) {
					arr.push(product)
				}

				categories[categoryName] = products
			}

			response[name] = categories
		}

		let email = req.body["email"]
		if (!email) return res.status(200).send({ response })

		const user = await UserModel.findOne({ email: email })

		const url = "http://127.0.0.1:5000/recommended_products"
		const method = "POST"
		const body = { email: email }

		let fetchRes = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})

		if (fetchRes.status != 200) {
			return res
				.status(500)
				.send({ error: ResponseMessages.INTERNAL_SERVER_ERROR })
		}

		let ans = await fetchRes.json()
		let recommended_product_ids = ans["data"]
		const recommended_products: Product_t[] = await ProductModel.find({
			id: { $in: recommended_product_ids },
		})
		// response["recommendedProducts"] = recommended_products
		// response["user"] = user
		return res.status(200).send({ response })
	} catch (error) {
		console.error("Error in getHomeData:", error)
		return res.status(500).send({ error: "Internal server error" })
	}
}

// --------------------------------------------------------------------------------------

