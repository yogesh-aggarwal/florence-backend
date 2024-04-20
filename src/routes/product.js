import { Product } from "../models/product.js";
import { User } from "../models/user.js";

export async function getProducts(_, res) {
  const products = await Product.find({});
  res.status(200).send({
    message: "Products fetched",
    data: products,
  });
}

export async function getProductById(req, res) {
  const product = await Product.findOne({ id: { $eq: req.body["id"] } });
  const email = req.body["email"];
  if (email) {
    const user = await User.findOne({ email: email });
    if (user) {
      const viewHistory = user.viewHistory;
      const check = viewHistory.includes(req.body["id"]);
      if (!check) {
        if (viewHistory.length >= 5) {
          viewHistory.shift();
        }
        viewHistory.push(req.body["id"]);

        await User.updateOne(
          { email: email },
          { $set: { viewHistory: viewHistory } }
        );
      }
    }
  }
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

  const products = await Product.find({ id: { $in: productIds } });
  let reqProducts = [];
  for (let product of products) {
    let pro = {};
    pro["title"] = product.title;
    pro["image"] = product.images[0];
    pro["id"] = product.toObject().id;


    reqProducts.push(pro);
  }

  res.status(200).send({
    message: "Products fetched",
    data: reqProducts,
  });
}

export async function getProductsByIdsWishlist(req, res) {
  const productIds = req.body["Wishlist"];
  const products = await Product.find({ id: { $in: productIds } });
  let reqProducts = [];
  for (let product of products) {
    let pro = {};
    pro["title"] = product.title;
    pro["images"] = product.images;
    pro["id"] = product.toObject().id;
    pro["price"]=product.price


    reqProducts.push(pro);
  }

  res.status(200).send({
    message: "Products fetched",
    data: reqProducts,
  });

}

