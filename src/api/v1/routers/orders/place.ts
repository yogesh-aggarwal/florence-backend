import { Request, Response } from "express"
import { Types } from "mongoose"
import Razorpay from "razorpay"
import { z } from "zod"
import { RAZORPAY_KEY_ID, RAZORPAY_SECRET } from "../../../../core/constants"
import { getRequestingUser, parseRequestBody } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { OrderModel } from "../../models/orders"
import { Order_t, OrderItem_t, OrderStatus } from "../../models/orders.types"
import { ProductModel } from "../../models/product"
import { UserAddress_t } from "../../models/user.types"
import { prepareOrderQuotation } from "../../services/quotation/quotation"

// --------------------------------------------------------------------------------------

const bodySchema = z.object({
	razorpayOrderID: z.string(),
	razorpayPaymentID: z.string(),
	razorpaySignature: z.string(),

	address: UserAddress_t,
	cart: z.record(z.number()), // { productID: quantity }
	coupon: z.union([z.string(), z.null()]),
})

// --------------------------------------------------------------------------------------

async function verifyOrderPayment(orderID: string) {
	const instance = new Razorpay({
		key_id: RAZORPAY_KEY_ID,
		key_secret: RAZORPAY_SECRET,
	})
	const isPaid = (await instance.orders.fetchPayments(orderID)).count

	return isPaid
}

// --------------------------------------------------------------------------------------

async function createOrder(body: z.infer<typeof bodySchema>, userID: string) {
	const productIDS = Object.keys(body.cart)
	const products = await ProductModel.find({ id: { $in: productIDS } })

	// Prepare order items
	const orderItems: OrderItem_t[] = products.map((x) => ({
		id: x.id,
		quantity: body.cart[x.id],
		price: x.price,
	}))

	// Prepare the quotation
	const quotation = await prepareOrderQuotation(
		body.address,
		orderItems,
		body.coupon
	)

	// Prepare the order
	const order: Order_t = {
		_id: new Types.ObjectId(),
		metadata: {
			createdAt: Date.now(),
			createdBy: userID,

			editedAt: Date.now(),
			editedBy: null,
			isEdited: false,
		},

		orderID: body.razorpayOrderID,

		tracking: {
			currentStatus: OrderStatus.Placed,
			history: [
				{
					timestamp: Date.now(),
					message: null,
					status: OrderStatus.Placed,
				},
			],
		},
		items: orderItems,
		paymentDetails: {
			recieptID: null,
			quotation: quotation,
			razorpayPaymentID: body.razorpayPaymentID,
			razorpaySignature: body.razorpaySignature,
		},
	}
	const validation = Order_t.safeParse(order)
	if (!validation.success) {
		throw new Error("Failed to validate the order's schema")
	}
	await new OrderModel(order).save()

	return order
}

// --------------------------------------------------------------------------------------

export default async function placeOrder(req: Request, res: Response) {
	/**
	 * Step 1: Gather all the required data from the request
	 */
	const body = parseRequestBody<z.infer<typeof bodySchema>>(req, bodySchema)
	if (!body) {
		return res
			.status(400)
			.send({ message: ResponseMessages.INVALID_BODY_CONTENT })
	}

	/**
	 * Step 2: Check if the order is already placed
	 */
	const doesAlreadyExists = await OrderModel.exists({
		orderID: body.razorpayOrderID,
	})
	if (doesAlreadyExists) {
		return res.status(400).send({ message: ResponseMessages.INVALID_REQUEST })
	}

	/**
	 * Step 3: Verify the payment & if not paid, return an error
	 */
	const isPaid = await verifyOrderPayment(body.razorpayOrderID)
	if (!isPaid) {
		return res.status(400).send({ message: ResponseMessages.INVALID_REQUEST })
	}

	/**
	 * Step 4: Prepare the order
	 */
	const user = getRequestingUser(req)
	if (!user) {
		return res.status(401).send({ message: ResponseMessages.AUTH_INVALID })
	}
	const order = await createOrder(body, user._id.toString())

	return res
		.status(200)
		.send({ message: ResponseMessages.SUCCESS, data: { orderID: order._id } })
}

// --------------------------------------------------------------------------------------
