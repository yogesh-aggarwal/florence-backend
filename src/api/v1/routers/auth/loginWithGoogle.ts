import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { OAuth2Client } from "google-auth-library"
import { z } from "zod"
import { GCP_OAUTH_CLIENT_ID, JWT_SECRET } from "../../../../core/constants"
import { parseRequestBody } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { UserModel } from "../../models/user"
import { createNewUser } from "../../models/user.helpers"
import { User_t } from "../../models/user.types"

// --------------------------------------------------------------------------------------

const client = new OAuth2Client(GCP_OAUTH_CLIENT_ID)

const bodySchema = z.object({
   tokenID: z.string(),
})

// --------------------------------------------------------------------------------------

export default async function authLoginWithGoogle(req: Request, res: Response) {
   try {
      /**
       * Step 1: Gather all the required data from the request
       */
      const body = parseRequestBody<z.infer<typeof bodySchema>>(req, bodySchema)
      if (!body) {
         return res.status(400).send({ message: ResponseMessages.INVALID_BODY_CONTENT })
      }

      /**
       * Step 2: Verify the OAuth token
       */
      const response = await client.verifyIdToken({
         idToken: body.tokenID,
         audience: client._clientId,
      })
      const payload = response.getPayload()
      if (!payload || !payload.email) {
         return res.status(400).send({ message: ResponseMessages.AUTH_INVALID })
      }

      /**
       * Step 3: Check if the user exists. If not, create a new user.
       */
      let user: User_t | null = (
         await UserModel.findOne({
            email: payload.email,
         })
      )?.toObject() as any
      if (!user) {
         user = await createNewUser({
            email: payload.email,
            name: payload.name ?? "Someone Special",
            password: "",
         })
      }

      /**
       * Step 4: Generate the JWT token and send it back to the user
       */
      const token: string = jwt.sign(user.email, JWT_SECRET)

      return res.status(200).send({ message: ResponseMessages.SUCCESS, token: token, user: user })
   } catch {
      return res.status(500).send({ message: ResponseMessages.INTERNAL_SERVER_ERROR })
   }
}

// --------------------------------------------------------------------------------------
