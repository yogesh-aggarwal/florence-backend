import { Request, Response } from "express"
import { Document } from "mongoose"
import { getRequestingUser } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { PlatformModel } from "../../models/platform"
import { PlatformHomeSection_t } from "../../models/platform.types"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"

// --------------------------------------------------------------------------------------

async function fetchRecommendedProductIDS(
	userEmail: string
): Promise<string[] | null> {
	const url = "http://127.0.0.1:5000/recommended_products"

	const fetchRes = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: userEmail }),
	})
	if (fetchRes.status !== 200) return null

	const fetchResBody = await fetchRes.json()
	const productIDS = fetchResBody["data"]

	return productIDS
}

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

		const response: Record<string, Record<string, Product_t[]> | Product_t[]> =
			{}
		for (const { name, productIds } of Object.values(data.sections)) {
			const categories: Record<string, Product_t[]> = {}
			for (const category of productIds) {
				const ids = Object.values(category)[0]
				const categoryName = Object.keys(category)[0]

				const products = await ProductModel.find({ id: { $in: ids } })
				const arr = []
				for (const product of products) {
					arr.push(product)
				}

				categories[categoryName] = products
			}

			response[name] = categories
		}

		const user = getRequestingUser(req)
		if (!user) {
			return res
				.status(404)
				.send({ error: ResponseMessages.AUTH_USER_DOES_NOT_EXIST })
		}

		const productIDS = await fetchRecommendedProductIDS(user.email)
		if (!productIDS) {
			return res
				.status(500)
				.send({ error: ResponseMessages.INTERNAL_SERVER_ERROR })
		}

		const products: Document<Product_t>[] = await ProductModel.find({
			id: { $in: productIDS },
		})
		const parsedProducts = products.map((product) => product.toObject())
		response["recommendedProducts"] = parsedProducts

		return res
			.status(200)
			.send({ message: ResponseMessages.SUCCESS, data: response })
	} catch (error) {
		console.error("Error in getHomeData:", error)
		return res
			.status(500)
			.send({ error: ResponseMessages.INTERNAL_SERVER_ERROR })
	}
}

// --------------------------------------------------------------------------------------
