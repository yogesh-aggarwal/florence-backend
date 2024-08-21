import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import mongoose, { Document } from "mongoose"

import { JWT_SECRET } from "../../../../core/constants"
import { generatePasswordHash, validatePassword } from "../../../../core/utils"
import { UserModel } from "../../models/user"

export default async function authSignup(req: Request, res: Response) {
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
	const user: Document | null = await UserModel.findOne({
		email: { $eq: email },
	})
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
	const newUser: Document = new UserModel({
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
}
