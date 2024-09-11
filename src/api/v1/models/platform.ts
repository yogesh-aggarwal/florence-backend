import { model, Schema } from "mongoose"
import { Platform_t } from "./platform.types"

const platformSchema = new Schema({}, { strict: false })

export const PlatformModel = model<Platform_t>("platform", platformSchema, "platform")
