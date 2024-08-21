import { Router } from "express"

import deleteUserAccount from "./deleteAccount"
import updateUserProfile from "./updateProfile"

export const userRouter = Router()

userRouter.patch("/updateProfile", updateUserProfile)
userRouter.delete("/deleteAccount", deleteUserAccount)
