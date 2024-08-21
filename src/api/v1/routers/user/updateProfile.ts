import { Request, Response } from "express"
import { ResponseMessages } from "../../core/messages"
import { UserModel } from "../../models/user"

export default async function updateUserProfile(req: Request, res: Response) {
	await UserModel.updateOne(
		{ email: req.body["email"] },
		{ $set: { wishlist: req.body["wishlist"] } }
	)
	res.status(200).send({ message: ResponseMessages.SUCCESS })
}
