import { Request, Response } from "express"
import Razorpay from "razorpay"
import { RAZORPAY_KEY_ID, RAZORPAY_SECRET } from "../../../../core/constants"

// --------------------------------------------------------------------------------------

export default async function createOrder(req: Request, res: Response) {
	var instance = new Razorpay({
		key_id: RAZORPAY_KEY_ID,
		key_secret: RAZORPAY_SECRET,
	})

	const order = await instance.orders.create({
		amount: +req.body["amount"],
		currency: "INR",
		receipt: "receipt#1",
	})

	res.status(200).send({
		message: "order created successfully",
		order: order,
	})
}

// --------------------------------------------------------------------------------------
