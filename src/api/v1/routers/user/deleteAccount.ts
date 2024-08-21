import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Document } from "mongoose"

import { JWT_SECRET } from "../../../../core/constants"
import { ResponseMessages } from "../../core/messages"
import { UserModel } from "../../models/user"

export default async function deleteUserAccount(req: Request, res: Response) {
	// Retrieving the data
	const { email } = req.body

	// If the provided email is not available in the database, return error
	const user: Document | null = await UserModel.findOne({
		email: { $eq: email },
	})
	if (!user) {
		res.status(401).send({ message: ResponseMessages.INVALID_REQUEST })
		return
	}

	// Generate a token and verify it with the existing token
	const token = req.headers["authorization"]?.replace("Bearer ", "")
	if (!token) {
		res.status(401).send({ message: ResponseMessages.INVALID_REQUEST })
		return
	}
	const tokenemail: string = jwt.verify(token, JWT_SECRET) as string

	// If the token user name (extracted above) is not equal to the provided email, return error
	if (email != tokenemail) {
		res.status(401).send({ message: ResponseMessages.INVALID_REQUEST })
		return
	}

	// Delete user's information from the database and return a success message
	await UserModel.deleteOne({ email: { $eq: email } })
	res.status(200).send({ message: ResponseMessages.SUCCESS })
}
