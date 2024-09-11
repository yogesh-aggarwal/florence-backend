import { Request, Response } from "express"
import { getRequestingUser } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"
import { UserViewHistoryModel } from "../../models/userViewHistory"
import { UserViewHistory_t } from "../../models/userViewHistory.types"

// --------------------------------------------------------------------------------------

async function increaseProductViewCount(productID: string) {
   await ProductModel.updateOne({ _id: { $eq: productID } }, { $inc: { "stats.views": 1 } })
}

// --------------------------------------------------------------------------------------

async function addToViewHistory(userID: string, productID: string) {
   const doesExist = await UserViewHistoryModel.exists({ userID: userID })
   if (!doesExist) {
      // Create a new view history for the user
      const model = new UserViewHistoryModel({
         userID: userID,
         viewHistory: [productID],
      })
      await model.save()

      // Increase the view count of the product
      await increaseProductViewCount(productID)

      return
   }

   // Get the view history of the user
   const viewHistory: UserViewHistory_t | null = (
      await UserViewHistoryModel.findOne({
         userID: userID,
      })
   )?.toObject() as any
   if (!viewHistory) return

   // Check if the product is already viewed by the user
   const existingIndex = viewHistory.history.findIndex((item) => item.productID === productID)

   // If the product is already viewed, push the timestamp
   if (existingIndex !== -1) {
      viewHistory.history[existingIndex].viewedAt.push(Date.now())
   }
   // If the product is not viewed already, add it to the list
   else {
      viewHistory.history.push({
         productID: productID,
         viewedAt: [Date.now()],
      })

      // Increase the view count of the product
      await increaseProductViewCount(productID)
   }

   await UserViewHistoryModel.updateOne({ userID: userID }, { history: viewHistory.history })
}

// --------------------------------------------------------------------------------------

export default async function getProductByID(req: Request, res: Response) {
   try {
      const product: Product_t | null = await ProductModel.findOne({
         _id: req.params.id,
      })
      if (!product) {
         return res.status(404).send({
            message: ResponseMessages.INVALID_RESOURCE_ID,
         })
      }

      /**
       * TODO: Add to view history in a non blocking way.
       *
       * Maybe use a threaded queue? (Not recommended, the system might die & we'll end up lose data)
       * Or a separate microservice? (Not recommended, too much overhead)
       * Or kafka? (Seems most appropriate, it guarantees delivery)
       */
      const user = getRequestingUser(req)
      if (user) {
         await addToViewHistory(user._id.toString(), req.params.id)
      }

      return res.status(200).send({ message: ResponseMessages.SUCCESS, data: product })
   } catch {
      return res.status(500).send({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
   }
}

// --------------------------------------------------------------------------------------
