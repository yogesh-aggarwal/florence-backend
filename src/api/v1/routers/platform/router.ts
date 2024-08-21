import { Router } from "express"

import getPlatformHomeData from "./home"

export const platformRouter = Router()

platformRouter.post("/home", getPlatformHomeData)
