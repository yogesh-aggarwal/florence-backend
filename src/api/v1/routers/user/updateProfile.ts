import { Request, Response } from "express"
import { ResponseMessages } from "../../core/messages"

// --------------------------------------------------------------------------------------

export default async function updateUserProfile(req: Request, res: Response) {
   try {
      // TODO: PENDING
   } catch {
      return res.status(500).send({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
   }
}

// --------------------------------------------------------------------------------------
