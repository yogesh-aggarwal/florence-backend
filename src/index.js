import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { deleteAccount, login, loginWithGoogle, signUp } from "./routes/auth.js";
import {
  getProductById,
  getProductsByTitle,
  getProducts,
  getTrendingProducts,
  getProductsByCategory,
  getProductByIds,
  getProductsByIdsWishlist,
} from "./routes/product.js";
import {
  createOrder,
  getOrderById,
  getOrderByUserId,
  placeOrder,
} from "./routes/orders.js";
import { Platform, getHomeData } from "./routes/platform.js";
import { updateWishlist } from "./routes/user.js";


config();
const mongoUrl=process.env.MONGOURL

// Configurations
const app = express();
// const port = 4000;
const port = process.env.PORT;

// Parsers
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));

// Endpoints
app.post("/login", login);
app.post("/signUp", signUp);
app.post("/deleteAccount", deleteAccount);
app.get("/getProducts", getProducts);
app.post("/getProductById", getProductById);
app.post("/getProductByIds", getProductByIds);
app.post("/getProductsByTitle", getProductsByTitle);
app.post("/getProductsByIdsWishlist", getProductsByIdsWishlist);
app.get("/getTrendingProducts", getTrendingProducts);
app.post("/getHomeData", getHomeData);
app.post("/getProductsByCategory", getProductsByCategory);
app.post("/order", createOrder);
app.post("/orderPlaced", placeOrder);
app.post("/getOrderById", getOrderById);
app.post("/getOrderByUserId", getOrderByUserId);
app.post("/updateWishlist",updateWishlist)

app.post("/loginWithGoogle", loginWithGoogle);

//addSampleProducts

// Setup
mongoose.connect(mongoUrl).then(async() => {
  console.log("mongo connected");
  app.listen(port, () => {
    console.log("server is started");
  });
});
