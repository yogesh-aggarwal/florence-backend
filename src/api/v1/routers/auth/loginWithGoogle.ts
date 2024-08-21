import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

import { OAuth2Client } from "google-auth-library"
import { Document } from "mongoose"
import { GCP_OAUTH_CLIENT_ID, JWT_SECRET } from "../../../../core/constants"
import { UserModel } from "../../models/user"

const client = new OAuth2Client(GCP_OAUTH_CLIENT_ID)

/**
 * Function does the following steps to facilitate Google OAuth login:
 *
 * 1. Get the token id from the body.
 * 2. Verify token id from verify "id_token" function from OAuth by giving the clientId.
 * 3. Check if response payload exists.
 * 4. Check if the user already exists in the database, if yes then send the jwt token.
 * 5. If not, then from the response payload get email, name, and profile pic of the user.
 * 6. Set and verify user from the mongo and then generate and send the jwt token.
 */
export default async function authLoginWithGoogle(req: Request, res: Response) {
	let { tokenId } = req.body

	const response = await client.verifyIdToken({
		idToken: tokenId,
		audience: client._clientId,
	})

	const payload = response.getPayload()
	if (!payload) {
		res.status(401).send()
		return
	}
	const user: Document | null = await UserModel.findOne({
		email: { $eq: payload.email },
	})
	if (!user) {
		const newUser: Document = new UserModel({
			_id: new mongoose.Types.ObjectId(),
			email: payload.email,
			password: "",
			name: payload.name,
			mobileNumbers: [],
			deliveryAddresses: [],
			dp: payload.picture ?? "",
		})
		const validationError = newUser.validateSync()
		if (validationError) {
			res.status(404).send({ message: validationError.message })
			return
		}

		await newUser.save()

		const token: string = jwt.sign(payload.email!, JWT_SECRET)
		res
			.status(200)
			.send({ message: "signed up successfully", token: token, user: newUser })
	} else {
		const token: string = jwt.sign(payload.email!, JWT_SECRET)
		res
			.status(200)
			.send({ message: "signed up successfully", token: token, user: user })
	}
}
