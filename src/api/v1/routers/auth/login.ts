import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { z } from "zod"
import { JWT_SECRET } from "../../../../core/constants"
import { parseRequestBody } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { UserModel } from "../../models/user"
import { User_t } from "../../models/user.types"

const bodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export default async function authLogin(req: Request, res: Response) {
	/**
	 * Step 1: Extract information from body & validate them
	 */
	const body = parseRequestBody<z.infer<typeof bodySchema>>(req, bodySchema)
	if (!body) {
		return res
			.status(401)
			.send({ message: ResponseMessages.INVALID_BODY_CONTENT })
	}

	/**
	 * Step 2: Check if user already exists, if not then raise error
	 */
	const user: User_t | null = (
		await UserModel.findOne({
			email: { $eq: body.email },
		})
	)?.toObject() as any
	if (!user) {
		return res
			.status(404)
			.send({ message: ResponseMessages.RESOURCE_DOES_NOT_EXISTS })
	}

	/**
	 * Step 3: Check for correctness of password
	 */
	const isMatched: boolean = await bcrypt.compare(body.password, user.password)
	if (!isMatched) {
		return res
			.status(401)
			.send({ message: ResponseMessages.AUTH_PASSWORD_INVALID })
	}

	/**
	 * Step 4: Generate token
	 */
	const token: string = jwt.sign(body.email, JWT_SECRET)

	return res
		.status(200)
		.send({ message: ResponseMessages.SUCCESS, token: token, user: user })
}
