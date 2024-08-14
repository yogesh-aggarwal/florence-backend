import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import { authRouter } from "./auth"
import { orderRouter } from "./orders"
import { platformRouter } from "./platform"
import { productRouter } from "./product"
import { userRouter } from "./user"

export const authenticatedRouter = Router()
{
	// Non-Authenticated Routers
	authenticatedRouter.use("/auth", authRouter)

	// Middlewares
	authenticatedRouter.use(authMiddleware)

	// Authenticated Routers
	authenticatedRouter.use("/order", orderRouter)
	authenticatedRouter.use("platform", platformRouter)
	authenticatedRouter.use("/product", productRouter)
	authenticatedRouter.use("/user", userRouter)
}
