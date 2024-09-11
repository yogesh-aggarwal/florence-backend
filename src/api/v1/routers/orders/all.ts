import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

import { JWT_SECRET } from "../../../../core/constants"
import { ResponseMessages } from "../../core/messages"
import { OrderModel } from "../../models/orders"
import { UserModel } from "../../models/user"

// --------------------------------------------------------------------------------------

export default async function getAllOrders(req: Request, res: Response) {
   try {
      // TODO:
      const token = req.headers["authorization"]!.replace("Bearer", "").trim()

      if (!token) {
         res.status(404).send({ message: "orders not found" })
         return
      }

      try {
         const tokenemail = jwt.verify(token, JWT_SECRET)

         if (!tokenemail || typeof tokenemail !== "string") {
            res.status(400).send({ message: "Invalid token format" })
            return
         }

         const user = await UserModel.findOne({ email: tokenemail })

         if (!user) {
            res.status(404).send({ message: "User not found" })
            return
         }

         const userId = user._id.toString()
         const orders = await OrderModel.find({ userID: new ObjectId(userId) })

         res.status(200).send({ orders: orders, message: "order fetched successfully" })
         return
      } catch (error) {
         // Handle JWT verification errors
         console.error("JWT verification error:", error)
         res.status(401).send({ message: "Unauthorized" })
         return
      }
   } catch {
      return res.status(500).send({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
   }
}

// --------------------------------------------------------------------------------------
