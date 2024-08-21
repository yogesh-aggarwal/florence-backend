import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { z } from "zod"
import { JWT_SECRET } from "../../../../core/constants"
import { parseRequestBody } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { UserModel } from "../../models/user"
import { createNewUser } from "../../models/user.helpers"

// --------------------------------------------------------------------------------------

const bodySchema = z.object({
	name: z.string().min(3).trim(),
	email: z.string().email().trim(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(50, "Password must be less than 50 characters long")
		.regex(/[A-Z]/, "Password must include at least one uppercase letter")
		.regex(/[0-9]/, "Password must include at least one number")
		.regex(
			/[!@#$%^&*()_+\-=?<>,.\[\]{}]/,
			"Password must include at least one special character"
		),
})

// --------------------------------------------------------------------------------------

export default async function authSignup(req: Request, res: Response) {
	/**
	 * Step 1: Retrieving the information of user
	 */
	const body = parseRequestBody<z.infer<typeof bodySchema>>(req, bodySchema)
	if (!body) {
		return res
			.status(400)
			.send({ message: ResponseMessages.INVALID_BODY_CONTENT })
	}

	/**
	 * Step 2: Checking if user already exists, if yes raise error
	 */
	const doesExists = await UserModel.exists({ email: { $eq: body.email } })
	if (doesExists) {
		return res
			.status(409)
			.send({ message: ResponseMessages.RESOURCE_ALREADY_EXISTS })
	}

	/**
	 * Step 3: Creating a variable which stores the information of the new user
	 */
	const user = await createNewUser(body)

	/**
	 * Step 4: Saving credentials of new user to the database and generating a token for the user
	 */
	const token: string = jwt.sign(body.email, JWT_SECRET)

	return res
		.status(200)
		.send({ message: ResponseMessages.SUCCESS, token: token, user: user })
}

// --------------------------------------------------------------------------------------
