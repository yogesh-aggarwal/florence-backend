import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { deleteAccount, login, signUp } from "./routes/auth";
import {
  getProductById,
  getProductsByTitle,
  getProducts,
  getTrendingProducts,
  getProductsByCategory,
} from "./routes/product";
import { createOrder, placeOrder } from "./routes/orders";

config();
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
app.post("/getProductsByTitle", getProductsByTitle);
app.get("/getTrendingProducts", getTrendingProducts);
app.post("/getProductsByCategory", getProductsByCategory);
app.post("/order", createOrder);
app.post("/orderPlaced", placeOrder);
//addSampleProducts

// Setup
mongoose.connect("mongodb://0.0.0.0:27017/florence").then(() => {
  console.log("mongo connected");
  app.listen(port, () => {
    console.log("server is started");
  });
});
