import { Router } from "express"

import { Product } from "../models/product"
import { Product_t } from "../models/product.types"
import { User } from "../models/user"
import { User_t } from "../models/user.types"

export const productRouter = Router()

productRouter.get("/:id", async (req, res) => {
	const product: Product_t | null = await Product.findOne({
		id: { $eq: req.params.id },
	})

	// TODO: CHECK JWT FOR USER EMAIL
	const email: string = req.body["email"]
	if (email) {
		const user: User_t | null = await User.findOne({ email: email })
		if (user) {
			const viewHistory: string[] = user.viewHistory
			const check: boolean = viewHistory.includes(req.params.id)
			if (!check) {
				if (viewHistory.length >= 5) {
					viewHistory.shift()
				}
				viewHistory.push(req.params.id)

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
})

productRouter.get("/all", async (_, res) => {
	const products: Product_t[] = await Product.find({})
	res.status(200).send({
		message: "Products fetched",
		data: products,
	})
})

productRouter.get("/category/:id", async (req, res) => {
	const id: string = req.params.id
	const products: Product_t[] = await Product.find({
		categories: { $elemMatch: { $eq: id } },
	}).limit(30)

	res.status(200).send({
		message: "products found",
		data: products,
	})
})

productRouter.get("/search/:query", async (req, res) => {
	const query: string = req.params.query
	const product: Product_t | null = await Product.findOne({
		title: { $regex: query },
	})
	res.status(200).send({
		message: "Product fetched",
		data: product,
	})
})

productRouter.get("/trending", async (_, res) => {
	const products: Product_t[] = await Product.find({}).limit(30)
	res.status(200).send({
		message: "Products fetched",
		data: products,
	})
})

productRouter.get("/wishlist", async (req, res) => {
	const email: string = req.body["email"]
	const user: User_t | null = await User.findOne({ email: email }).populate(
		"wishlist"
	)
	if (!user) {
		res.status(404).send({
			message: "User not found",
		})
		return
	}

	const products: Product_t[] = await Product.find({
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
})

productRouter.post("/getByIDS", async (req, res) => {
	const ids: string[] = req.body["ids"]

	const products: Product_t[] = await Product.find({ id: { $in: ids } })
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
})
