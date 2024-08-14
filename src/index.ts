import cors from "cors"
import express from "express"
import mongoose from "mongoose"

import { v1 } from "./api/v1/api"
import { ALLOWED_ORIGINS, MONGO_URI, PORT } from "./core/constants"

// ----------------------------------------------------------------------------
// Router
// ----------------------------------------------------------------------------

const app = express()
{
	// Middlewares
	app.use(express.json())
	app.use(cors({ origin: ALLOWED_ORIGINS }))

	// Routers
	app.use("/v1", v1)
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
	await mongoose.connect(MONGO_URI)

	console.log("✅ Mongo connected")
	app.listen(PORT, () => {
		console.log(`✅ Server started at http://localhost:${PORT}`)
	})
}

// ----------------------------------------------------------------------------

main()
