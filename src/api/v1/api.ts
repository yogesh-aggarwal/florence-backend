import { Router } from "express"

import authMiddleware from "./middlewares/auth"
import { authRouter } from "./routers/auth"
import { orderRouter } from "./routers/orders"
import { platformRouter } from "./routers/platform"
import { productRouter } from "./routers/product"
import { userRouter } from "./routers/user"

export const v1 = Router()

// ----------------------------------------------------------------------------
// Health check
// ----------------------------------------------------------------------------

v1.get("/health", (_, res) => res.status(200).send("OK"))

// ----------------------------------------------------------------------------
// Routers
// ----------------------------------------------------------------------------

// Non-Authenticated Routers
v1.use("/auth", authRouter)

// Middlewares
v1.use(authMiddleware)

// Authenticated Routers
v1.use("/order", orderRouter)
v1.use("platform", platformRouter)
v1.use("/product", productRouter)
v1.use("/user", userRouter)

// ----------------------------------------------------------------------------
