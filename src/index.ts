import cors from "cors"
import express from "express"
import mongoose from "mongoose"

import { v1 } from "./api/v1/api"
import { ALLOWED_ORIGINS, MONGO_DB_NAME, MONGO_URI, PORT } from "./core/constants"

// ----------------------------------------------------------------------------
// Router
// ----------------------------------------------------------------------------

const app = express()
{
   // Middlewares
   app.use(express.json())
   app.use(cors({ origin: ALLOWED_ORIGINS }))

   app.get("/", (_, res) => {
      res.redirect("/v1")
   })

   // Health check
   app.get("/health", (_, res) => res.status(200).send("OK"))

   // Routers
   app.use("/v1", v1)
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
   await mongoose.connect(MONGO_URI, { dbName: MONGO_DB_NAME })

   console.log("✅ Mongo connected")
   app.listen(PORT, () => {
      console.log(`\n🚀 Server started at:\n   http://localhost:${PORT}`)
   })
}

// ----------------------------------------------------------------------------

main()
