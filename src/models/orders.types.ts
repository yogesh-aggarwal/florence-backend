export enum OrderStatus {
	Placed = "placed",
	Transit = "transit",
	Delivered = "delivered",
}

export type OrderTimestampSchema_t = {
	placed: number
	transit: number
	delivered: number
}

export type Order_t = {
	id: string
	userID: string
	razorpayPaymentID: string
	razorpaySignature: string
	timestamps: OrderTimestampSchema_t
	orderItems: object // TODO:
	priceItems: object // TODO:
	currentStatus: OrderStatus // TODO: Make it a progressive status with timestamps underhood
}
