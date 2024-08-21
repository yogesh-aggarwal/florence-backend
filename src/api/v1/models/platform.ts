import { model, Schema } from "mongoose"
import { Platform_t } from "./platform.types"

let platformSchema = new Schema({}, { strict: false })

export const PlatformModel = model<Platform_t>("platform", platformSchema)
