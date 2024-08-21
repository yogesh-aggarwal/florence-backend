import { Request, Response } from "express"
import Razorpay from "razorpay"
import { RAZORPAY_KEY_ID, RAZORPAY_SECRET } from "../../../../core/constants"
import { OrderModel } from "../../models/orders"
import { ProductModel } from "../../models/product"

export default async function placeOrder(req: Request, res: Response) {
	let razorpay_order_id = await OrderModel.findOne({
		id: { $eq: req.body["razorpay_order_id"] },
	})
	let razorpay_payment_id = await OrderModel.findOne({
		id: { $eq: req.body["razorpay_payment_id"] },
	})
	let razorpay_signature = await OrderModel.findOne({
		id: { $eq: req.body["razorpay_signature"] },
	})
	if (razorpay_order_id || razorpay_payment_id || razorpay_signature) {
		res.status(400).send({ message: "the order is already created" })
		return
	}

	var instance = new Razorpay({
		key_id: RAZORPAY_KEY_ID,
		key_secret: RAZORPAY_SECRET,
	})
	const orderPaid = (
		await instance.orders.fetchPayments(req.body["razorpay_order_id"])
	).count
	if (!orderPaid) {
		res.status(400).send({ message: "the order is not paid" })
		return
	}
	const productIds = Object.keys(req.body["cart"])

	let products = await ProductModel.find({ id: { $in: productIds } })
	let productPrices: { [key: string]: number } = {}

	for (let product of products) {
		productPrices[product.id] = product.price
	}

	const order = new OrderModel({
		id: req.body["razorpay_order_id"],
		userID: req.body["userId"],
		razorpay_payment_id: req.body["razorpay_payment_id"],
		razorpay_signature: req.body["razorpay_signature"],
		orderItems: req.body["cart"],
		timestamps: {
			placed: Date.now(),
			transit: 0,
			delivered: 0,
		},
		currentStatus: "placed",
		priceItems: productPrices,
	})

	const validOrderError = order.validateSync()
	if (validOrderError) {
		res.status(400).send({ message: validOrderError.message })
		return
	}

	await order.save()

	res
		.status(200)
		.send({ message: "order placed successfully", orderId: order.id })
}
