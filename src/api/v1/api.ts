import { Router } from "express"
import swaggerUI from "swagger-ui-express"

import { swaggerSpec } from "./core/swagger"
import { authMiddleware } from "./middlewares/auth"
import { authRouter } from "./routers/auth/router"
import { orderRouter } from "./routers/orders/router"
import { platformRouter } from "./routers/platform/router"
import { productRouter } from "./routers/product/router"
import { userRouter } from "./routers/user/router"

export const v1 = Router()

// ----------------------------------------------------------------------------
// Health check
// ----------------------------------------------------------------------------

v1.get("/health", (_, res) => res.status(200).send("OK"))
v1.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// ----------------------------------------------------------------------------
// Routers
// ----------------------------------------------------------------------------

// Non-Authenticated Routers
v1.use("/auth", authRouter)

// Middlewares
v1.use(authMiddleware)

// Authenticated Routers
v1.use("/order", orderRouter)
v1.use("/platform", platformRouter)
v1.use("/product", productRouter)
v1.use("/user", userRouter)

// ----------------------------------------------------------------------------
