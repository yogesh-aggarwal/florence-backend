import cors from "cors"
import express from "express"
import mongoose from "mongoose"

import { ALLOWED_ORIGINS, MONGO_URI, PORT } from "./core/constants"
import { authRouter } from "./routers/auth"
import { orderRouter } from "./routers/orders"
import { platformRouter } from "./routers/platform"
import { productRouter } from "./routers/product"
import { userRouter } from "./routers/user"

const app = express()

// Configurations
app.use(express.json())
app.use(cors({ origin: ALLOWED_ORIGINS }))

// Routers
app.use("/auth", authRouter)
app.use("/order", orderRouter)
app.use("platform", platformRouter)
app.use("/product", productRouter)
app.use("/user", userRouter)

async function main() {
	await mongoose.connect(MONGO_URI)

	console.log("✅ Mongo connected")
	app.listen(PORT, () => {
		console.log("✅ Server started")
	})
}

main()
