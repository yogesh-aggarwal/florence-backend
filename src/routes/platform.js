import mongoose, { Schema } from "mongoose";
import { Product } from "../models/product";

let platformSchema = new Schema({}, { strict: false });

export const Platform = mongoose.model("platform", platformSchema, "platform");

export async function getHomeData(req, res) {
  const data = await Platform.findOne({ id: "homeMeta" });


  let response = {};
  for (const { name, productIds } of Object.values(data.homeSections)) {
    let categories = {};
    for (let category of productIds) {
      const ids = Object.values(category)[0];
      const categoryName = Object.keys(category)[0];

      const products = await Product.find({ id: { $in: ids } });
      let arr = [];
      for (let product of products) {
        
        arr.push(product);
      }

      categories[categoryName] = arr;
    }
    response[name] = categories;
  }

  res.status(200).send({ response });
}
