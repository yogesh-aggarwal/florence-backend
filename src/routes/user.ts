import { User } from "../models/user"

export async function updateWishlist(req, res) {
	await User.updateOne(
		{ email: req.body["email"] },
		{ $set: { wishlist: req.body["wishlist"] } }
	)
	res.status(200).send({ message: "wishlist updated" })
}
