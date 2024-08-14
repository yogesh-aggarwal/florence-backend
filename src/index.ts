import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import { MONGO_URI, PORT } from "./core/constants"
import { deleteAccount, login, loginWithGoogle, signUp } from "./routes/auth"
import {
	createOrder,
	getOrderById,
	getOrderByUserId,
	placeOrder,
} from "./routes/orders"
import { getHomeData } from "./routes/platform"
import { productRouter } from "./routes/product"
import { updateWishlist } from "./routes/user"

// Configurations
const app = express()

// Parsers
app.use(express.json())
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }))

app.use("/product", productRouter)

// Endpoints
app.post("/login", login)
app.post("/signUp", signUp)
app.post("/deleteAccount", deleteAccount)
app.post("/getHomeData", getHomeData)
app.post("/order", createOrder)
app.post("/orderPlaced", placeOrder)
app.post("/getOrderById", getOrderById)
app.post("/getOrderByUserId", getOrderByUserId)
app.post("/updateWishlist", updateWishlist)

app.post("/loginWithGoogle", loginWithGoogle)

//addSampleProducts

// Setup
mongoose.connect(MONGO_URI).then(async () => {
	console.log("mongo connected")
	app.listen(PORT, () => {
		console.log("server is started")
	})
})
