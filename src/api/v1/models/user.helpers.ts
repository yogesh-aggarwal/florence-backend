import bcrypt from "bcrypt"
import { Types } from "mongoose"

import { generateNanoid } from "../../../core/utils"
import { UserModel } from "./user"
import { User_t } from "./user.types"

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

export async function createNewUser(data: {
	email: string
	name: string
	password: string
}): Promise<User_t> {
	const encryptedPassword = await generatePasswordHash(data.password)
	const dpURL = `https://picsum.photos/seed/${generateNanoid(5)}/200/200`

	const user: User_t = {
		_id: new Types.ObjectId(),
		metadata: {
			createdAt: Date.now(),
			updatedAt: Date.now(),

			isUpdated: false,
		},

		dp: dpURL,
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
		// Extremely less likely to happen but still a possibility
		throw new Error("User is not valid due to some system error")
	}

	await new UserModel(user).save()

	return user
}

// --------------------------------------------------------------------------------------
