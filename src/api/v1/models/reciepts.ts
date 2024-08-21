import { model, Schema } from "mongoose"

// --------------------------------------------------------------------------------------

const RecieptMetadataSchema = new Schema({
	createdBy: { type: String, required: true },
	createdAt: { type: Number, required: true },
	updatedAt: { type: Number, required: true },
	isUpdated: { type: Boolean, required: true },
})

const RecieptSchema = new Schema({
	id: { type: String, required: true },
	metadata: { type: RecieptMetadataSchema, required: true },
	url: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const RecieptModel = model("reciept", RecieptSchema, "reciepts")

// --------------------------------------------------------------------------------------
