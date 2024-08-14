import bcrypt from "bcrypt"
import { Request, Response, Router } from "express"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import mongoose, { Document } from "mongoose"

import { GCP_OAUTH_CLIENT_ID, JWT_SECRET } from "../../../core/constants"
import { generatePasswordHash, validatePassword } from "../../../core/utils"
import { ResponseMessages } from "../core/messages"
import { User } from "../models/user"
import { User_t } from "../models/user.types"

export const authRouter = Router()

const client = new OAuth2Client(GCP_OAUTH_CLIENT_ID)

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
authRouter.post("login", async (req: Request, res: Response) => {
	// Step 1: Extract information from body & validate them
	let { email, password } = req.body
	if (!email || !password) {
		res.status(401).send({ message: ResponseMessages.INVALID_BODY_CONTENT })
		return
	}

	// Step 2: Check if user already exists, if not then raise error
	const user: User_t | null = await User.findOne({ email: { $eq: email } })
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
})

authRouter.post("/signup", async (req: Request, res: Response) => {
	// Step 1: Retrieving the information of user
	let { email, password, name } = req.body

	if (email) email = email.trim()
	if (name) name = name.trim()
	if (password) password = password.trim()

	// !x is true if x is any of these: 0, null, undefined, ""
	// Exception: !x is still false if x is [], {}
	if (!email || !password || !name) {
		res.status(404).send({ message: "please enter the required fields" })
		return
	}

	// Step 2: Checking if user already exists, if yes raise error
	const user: Document | null = await User.findOne({ email: { $eq: email } })
	if (user) {
		res.status(404).send({ message: "email already exists" })
		return
	}

	// Step 3: Validating the password, if it's not valid raise error, else generate hashed password
	if (!validatePassword(password)) {
		res.status(404).send({
			message:
				"Password must contain at least 1 of each of the following: lowercase, uppercase, number, special character.",
		})
		return
	}
	password = await generatePasswordHash(password)

	// Step 4: Creating a variable which stores the information of the new user
	const newUser: Document = new User({
		_id: new mongoose.Types.ObjectId(),
		email: email,
		password: password,
		name: name,
		mobileNumbers: [],
		deliveryAddresses: [],
		dp: "",
	})

	// Step 5: If credentials are not validated, return error
	const validationError = newUser.validateSync()
	if (validationError) {
		res.status(404).send({ message: validationError.message })
		return
	}

	// Step 6: Saving credentials of new user to the database and generating a token for the user
	await newUser.save()
	const token: string = jwt.sign(email, JWT_SECRET)
	res
		.status(200)
		.send({ message: "signed up successfully", token: token, user: newUser })
})

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
authRouter.post("/loginWithGoogle", async (req: Request, res: Response) => {
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
	const user: Document | null = await User.findOne({
		email: { $eq: payload.email },
	})
	if (!user) {
		const newUser: Document = new User({
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
})
