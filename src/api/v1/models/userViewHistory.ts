import { model, Schema, Types } from "mongoose"
import { UserViewHistory_t } from "./userViewHistory.types"

// --------------------------------------------------------------------------------------

const UserViewHistoryItemSchema = new Schema({
	productID: { type: String, required: true },
	viewedAt: { type: Number, required: true },
})

const UserViewHistorySchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	userID: { type: String, required: true },
	history: { type: [UserViewHistoryItemSchema], required: true },
})

// --------------------------------------------------------------------------------------

export const UserViewHistoryModel = model<UserViewHistory_t>(
	"user_view_history",
	UserViewHistorySchema,
	"user_view_history"
)

// --------------------------------------------------------------------------------------
