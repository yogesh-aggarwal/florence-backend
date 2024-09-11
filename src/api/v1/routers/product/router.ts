import { Router } from "express"
import getProductByID from "./[id]"
import getAllProducts from "./all"
import getProductsByCategory from "./category/[id]"
import getProductsByIDS from "./getByIDS"
import getProductsBySearch from "./search/[query]"
import getTrendingProducts from "./trending"

export const productRouter = Router()

productRouter.get("/all", getAllProducts)
productRouter.get("/category/:id", getProductsByCategory)
productRouter.get("/search/:query", getProductsBySearch)
productRouter.get("/trending", getTrendingProducts)
productRouter.get("/getByIDS", getProductsByIDS)

productRouter.get("/:id", getProductByID)
