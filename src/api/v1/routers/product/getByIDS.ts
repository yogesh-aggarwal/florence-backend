import { Request, Response } from "express"
import { Document } from "mongoose"
import { z } from "zod"
import { parseRequestBody } from "../../core/helpers"
import { ResponseMessages } from "../../core/messages"
import { ProductModel } from "../../models/product"
import { Product_t } from "../../models/product.types"

// --------------------------------------------------------------------------------------

const bodySchema = z.object({
	ids: z.array(z.string()),
})

// --------------------------------------------------------------------------------------

export default async function getProductsByIDS(req: Request, res: Response) {
	const body = parseRequestBody<z.infer<typeof bodySchema>>(req, bodySchema)
	if (!body) {
		return res
			.status(400)
			.send({ message: ResponseMessages.INVALID_BODY_CONTENT })
	}

	// TODO: View counting here? Do we need to increase the view count of the product?
	const products: Document<Product_t>[] = await ProductModel.find({
		_id: { $in: body.ids },
	})
	const parsedProducts = products.map((product) => product.toObject())

	return res
		.status(200)
		.send({ message: ResponseMessages.SUCCESS, data: parsedProducts })
}

// --------------------------------------------------------------------------------------
