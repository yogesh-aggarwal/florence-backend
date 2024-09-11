import { model, Schema, Types } from "mongoose"
import { Reciept_t } from "./reciepts.types"

// --------------------------------------------------------------------------------------

const RecieptMetadataSchema = new Schema({
   createdBy: { type: String, required: true },
   createdAt: { type: Number, required: true },
   updatedAt: { type: Number, required: true },
   isUpdated: { type: Boolean, required: true },
})

const RecieptSchema = new Schema({
   _id: { type: Types.ObjectId, required: true },
   metadata: { type: RecieptMetadataSchema, required: true },
   url: { type: String, required: true },
})

// --------------------------------------------------------------------------------------

export const RecieptModel = model<Reciept_t>("reciept", RecieptSchema, "reciepts")

// --------------------------------------------------------------------------------------
