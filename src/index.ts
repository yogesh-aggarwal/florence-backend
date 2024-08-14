import cors from "cors"
import express, { Router } from "express"
import mongoose from "mongoose"

import { ALLOWED_ORIGINS, MONGO_URI, PORT } from "./core/constants"
import authMiddleware from "./middlewares/auth"
import { authRouter } from "./routers/auth"
import { orderRouter } from "./routers/orders"
import { platformRouter } from "./routers/platform"
import { productRouter } from "./routers/product"
import { userRouter } from "./routers/user"

// ----------------------------------------------------------------------------
// Authenticated routes
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// Main router
// ----------------------------------------------------------------------------

const app = express()
{
	// Middlewares
	app.use(express.json())
	app.use(cors({ origin: ALLOWED_ORIGINS }))

	// Routers
	app.use("/auth", authRouter)
	app.use("/", authenticatedRouter)

	// Health check
	app.get("/health", (req, res) => {
		res.status(200).send({ message: "OK" })
	})
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
	await mongoose.connect(MONGO_URI)

	console.log("✅ Mongo connected")
	app.listen(PORT, () => {
		console.log("✅ Server started")
	})
}

// ----------------------------------------------------------------------------

main()
