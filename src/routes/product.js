import mongoose from "mongoose";
import { Product, productSchema } from "../models/product";

export async function getProducts(_, res) {
  const products = await Product.find({});
  res.status(200).send({
    message: "Products fetched",
    data: products,
  });
}

export async function getProductById(req, res) {
  const product = await Product.findOne({ _id: { $eq: req.body["id"] } });
  res.status(200).send({
    message: "Product fetched",
    data: product,
  });
}

export async function getProductsByCategory(req, res) {
  const products = await Product.find({
    categories: { $elemMatch: { $eq: req.body["category"] } },
  }).limit(30);
  res.status(200).send({
    message: "products found",
    data: products,
  });
}

export async function getProductsByTitle(req, res) {
  const product = await Product.findOne({
    title: { $regex: req.body["title"] },
  });
  res.status(200).send({
    message: "Product fetched",
    data: product,
  });
}

export async function getTrendingProducts(_, res) {
  const products = await Product.find({}).limit(30);
  res.status(200).send({
    message: "Products fetched",
    data: products,
  });
}

export async function getProductByIds(req, res) {
  const productIds = req.body["ids"];

  const products = await Product.find({ _id: { $in: productIds } });
  let reqProducts = [];
  for (let product of products) {
    let pro = {};
    pro["title"] = product.title;
    pro["image"] = product.images[0];
    pro["id"] = product._id;

    reqProducts.push(pro);
  }
  res.status(200).send({
    message: "Products fetched",
    data: reqProducts,
  });
}
