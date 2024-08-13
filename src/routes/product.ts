import { Request, Response } from "express"
import { Product, Product_t } from "../models/product"
import { User } from "../models/user"

export async function getProducts(_: Request, res: Response): Promise<void> {
	const products: Product_t[] = await Product.find({})
	res.status(200).send({
		message: "Products fetched",
		data: products,
	})
}

export async function getProductById(
	req: Request,
	res: Response
): Promise<void> {
	const product: Product_t | null = await Product.findOne({
		id: { $eq: req.body["id"] },
	})
	const email: string = req.body["email"]
	if (email) {
		const user: User | null = await User.findOne({ email: email })
		if (user) {
			const viewHistory: string[] = user.viewHistory
			const check: boolean = viewHistory.includes(req.body["id"])
			if (!check) {
				if (viewHistory.length >= 5) {
					viewHistory.shift()
				}
				viewHistory.push(req.body["id"])

				await User.updateOne(
					{ email: email },
					{ $set: { viewHistory: viewHistory } }
				)
			}
		}
	}
	res.status(200).send({
		message: "Product fetched",
		data: product,
	})
}

export async function getProductsByCategory(
	req: Request,
	res: Response
): Promise<void> {
	const products: Product_t[] = await Product.find({
		categories: { $elemMatch: { $eq: req.body["category"] } },
	}).limit(30)
	res.status(200).send({
		message: "products found",
		data: products,
	})
}

export async function getProductsByTitle(
	req: Request,
	res: Response
): Promise<void> {
	const product: Product_t | null = await Product.findOne({
		title: { $regex: req.body["title"] },
	})
	res.status(200).send({
		message: "Product fetched",
		data: product,
	})
}

export async function getTrendingProducts(
	_: Request,
	res: Response
): Promise<void> {
	const products: Product_t[] = await Product.find({}).limit(30)
	res.status(200).send({
		message: "Products fetched",
		data: products,
	})
}

export async function getProductByIds(
	req: Request,
	res: Response
): Promise<void> {
	const productIds: string[] = req.body["ids"]

	const products: Product_t[] = await Product.find({ id: { $in: productIds } })
	let reqProducts: any[] = []
	for (let product of products) {
		let pro: any = {}
		pro["title"] = product.title
		pro["image"] = product.images[0]
		pro["id"] = product.toObject().id

		reqProducts.push(pro)
	}

	res.status(200).send({
		message: "Products fetched",
		data: reqProducts,
	})
}

export async function getProductsByIdsWishlist(
	req: Request,
	res: Response
): Promise<void> {
	const productIds: string[] = req.body["Wishlist"]
	const products: Product_t[] = await Product.find({ id: { $in: productIds } })
	let reqProducts: any[] = []
	for (let product of products) {
		let pro: any = {}
		pro["title"] = product.title
		pro["images"] = product.images
		pro["id"] = product.toObject().id
		pro["price"] = product.price

		reqProducts.push(pro)
	}

	res.status(200).send({
		message: "Products fetched",
		data: reqProducts,
	})
}
