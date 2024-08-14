import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import { authRouter } from "./auth/auth"
import { orderRouter } from "./orders/orders"
import { platformRouter } from "./platform/platform"
import { productRouter } from "./product/product"
import { userRouter } from "./user/user"

const authenticatedRouter = Router()
{
	// Middlewares
	authenticatedRouter.use(authMiddleware)

	// Routers
	authenticatedRouter.use("/order", orderRouter)
	authenticatedRouter.use("platform", platformRouter)
	authenticatedRouter.use("/product", productRouter)
	authenticatedRouter.use("/user", userRouter)
}

// Routers
export const rootRouter = Router()
rootRouter.use("/auth", authRouter)
rootRouter.use("/", authenticatedRouter)
