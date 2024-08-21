import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { JWT_SECRET } from "../../../../core/constants"
import { ResponseMessages } from "../../core/messages"
import { UserModel } from "../../models/user"
import { User_t } from "../../models/user.types"

/**
 * 1. Get the body
 * 2. Check if user already exists or not
 *    Components:
 *      a. Database
 *      b. Method to interact
 * 3. If not exists, return failure
 * 4. Retrieve user
 * 5. password check
 * 6. Encrypt the retrieved user data in a JWT token
 * 7. Return the generated JWT token
 */
export default async function authLogin(req: Request, res: Response) {
	// Step 1: Extract information from body & validate them
	let { email, password } = req.body
	if (!email || !password) {
		res.status(401).send({ message: ResponseMessages.INVALID_BODY_CONTENT })
		return
	}

	// Step 2: Check if user already exists, if not then raise error
	const user: User_t | null = await UserModel.findOne({ email: { $eq: email } })
	if (!user) {
		res.status(401).send({ message: ResponseMessages.INVALID_REQUEST })
		return
	}

	// Step 3: Check for correctness of password
	const isMatched: boolean = await bcrypt.compare(password, user["password"])
	if (!isMatched) {
		res.status(401).send({ message: ResponseMessages.AUTH_PASSWORD_INVALID })
		return
	}

	// Step 4: Generate token
	const token: string = jwt.sign(email, JWT_SECRET)
	res.status(200).send({ token: token, user: user })
}
