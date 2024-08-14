import cors from "cors"
import express from "express"
import mongoose from "mongoose"

import { ALLOWED_ORIGINS, MONGO_URI, PORT } from "./core/constants"
import { rootRouter } from "./routers/root"

const app = express()

// Configurations
{
	app.use(express.json())
	app.use(cors({ origin: ALLOWED_ORIGINS }))
}

// Routers
{
	app.use("/", rootRouter)
}

// Health check
{
	app.get("/health", (req, res) => {
		res.status(200).send({ message: "OK" })
	})
}

async function main() {
	await mongoose.connect(MONGO_URI)

	console.log("✅ Mongo connected")
	app.listen(PORT, () => {
		console.log("✅ Server started")
	})
}

main()
