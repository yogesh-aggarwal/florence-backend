import { Router } from "express"

import getOrderByID from "./[id]"
import getAllOrders from "./all"
import createOrder from "./create"
import placeOrder from "./place"
import { authMiddleware } from "../../middlewares/auth"

export const orderRouter = Router()

// Middlewares
orderRouter.use(authMiddleware)

// Routes
orderRouter.get("/:id", getOrderByID)
orderRouter.get("/all", getAllOrders)
orderRouter.post("/create", createOrder)
orderRouter.post("/place", placeOrder)
