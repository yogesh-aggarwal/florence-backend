import { Request, Response } from "express"

import { getRequestingUser } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { UserModel } from "../../models/user"

// --------------------------------------------------------------------------------------

export default async function deleteUserAccount(req: Request, res: Response) {
   try {
      const user = getRequestingUser(req)
      if (!user) {
         return res.status(401).send({ message: ResponseMessages.INVALID_REQUEST })
      }

      const doesExists = await UserModel.exists({ email: user.email })
      if (!doesExists) {
         return res.status(401).send({ message: ResponseMessages.INVALID_REQUEST })
      }

      // TODO: Delete user's other information as well (like orders, etc.)
      await UserModel.deleteOne({ email: user.email })

      return res.status(200).send({ message: ResponseMessages.SUCCESS })
   } catch {
      return res.status(500).send({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
   }
}

// --------------------------------------------------------------------------------------
