import { Router } from "express"

import getOrderByID from "./[id]"
import getAllOrders from "./all"
import createOrder from "./create"
import placeOrder from "./place"

export const orderRouter = Router()

orderRouter.get("/:id", getOrderByID)
orderRouter.get("/all", getAllOrders)
orderRouter.post("/create", createOrder)
orderRouter.post("/place", placeOrder)
