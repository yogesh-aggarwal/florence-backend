import Razorpay from "razorpay";
import { Order } from "../models/orders";
import { Product } from "../models/product";

export async function createOrder(req, res) {
  var instance = new Razorpay({
    key_id: "rzp_test_rMU9G0FV33EqNz",
    key_secret: "d6eGkT4YLobWwh7RS9uefJW1",
  });

  const order = await instance.orders.create({
    amount: +req.body["amount"],
    currency: "INR",
    receipt: "receipt#1",
  });

  res.status(200).send({
    message: "order created successfully",
    order: order,
  });
}

export async function placeOrder(req, res) {
  let razorpay_order_id = await Order.findOne({
    id: { $eq: req.body["razorpay_order_id"] },
  });
  let razorpay_payment_id = await Order.findOne({
    id: { $eq: req.body["razorpay_payment_id"] },
  });
  let razorpay_signature = await Order.findOne({
    id: { $eq: req.body["razorpay_signature"] },
  });
  if (razorpay_order_id || razorpay_payment_id || razorpay_signature) {
    res.status(400).send({ message: "the order is already created" });
    return;
  }

  var instance = new Razorpay({
    key_id: "rzp_test_rMU9G0FV33EqNz",
    key_secret: "d6eGkT4YLobWwh7RS9uefJW1",
  });
  const orderPaid = (
    await instance.orders.fetchPayments(req.body["razorpay_order_id"])
  ).count;
  if (!orderPaid) {
    res.status(400).send({ message: "the order is not paid" });
    return;
  }
  const productIds = Object.keys(req.body["cart"]);

  let products = await Product.find({ _id: { $in: productIds } });

  let productPrices = {};

  for (let product of products) {
    productPrices[product.id] = product.price;
  }

  const order = new Order({
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
  });

  const validOrderError = order.validateSync();
  if (validOrderError) {
    res.status(400).send({ message: validOrderError.message });
    return;
  }

  await order.save();

  return res.status(200).send({ message: "order placed successfully" });
}
