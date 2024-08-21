import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { Types } from "mongoose"
import { z } from "zod"
import { JWT_SECRET } from "../../../../core/constants"
import { parseRequestBody } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { UserModel } from "../../models/user"
import { User_t } from "../../models/user.types"

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

/**
 * Encyrpts the password using bcrypt's algorithms
 *
 * @param password Plain text form of password
 * @returns Returns the hash of the password
 */
async function generatePasswordHash(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(5)
	const hash = await bcrypt.hash(password, salt)
	return hash
}

// --------------------------------------------------------------------------------------

async function createNewUser(
	data: z.infer<typeof bodySchema>
): Promise<User_t> {
	const encryptedPassword = await generatePasswordHash(data.password)

	const user: User_t = {
		_id: new Types.ObjectId(),
		metadata: {
			createdAt: Date.now(),
			updatedAt: Date.now(),

			isUpdated: false,
		},

		// TODO: insert nanoid here
		dp: `https://picsum.photos/seed/${"nanoid"}/200/200`,
		name: data.name,
		email: data.name,
		password: encryptedPassword,

		data: {
			wishlist: [],
			deliveryAddresses: [],
		},
	}
	const validation = User_t.safeParse(user)
	if (!validation.success) {
		throw new Error("User is not valid due to some system error")
	}

	await new UserModel(user).save()

	return user
}

// --------------------------------------------------------------------------------------

export default async function authSignup(req: Request, res: Response) {
	/**
	 * Step 1: Retrieving the information of user
	 */
	const body = parseRequestBody<z.infer<typeof bodySchema>>(req, bodySchema)
	if (!body) {
		return res
			.status(401)
			.send({ message: ResponseMessages.INVALID_BODY_CONTENT })
	}

	/**
	 * Step 2: Checking if user already exists, if yes raise error
	 */
	const doesExists = await UserModel.exists({ email: { $eq: body.email } })
	if (doesExists) {
		return res
			.status(401)
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
		.send({ message: "signed up successfully", token: token, user: user })
}

// --------------------------------------------------------------------------------------
