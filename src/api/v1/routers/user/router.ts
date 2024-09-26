import { Router } from "express"

import { authMiddleware } from "../../middlewares/auth"
import deleteUserAccount from "./deleteAccount"
import updateUserProfile from "./updateProfile"

export const userRouter = Router()

// Middlewares
userRouter.use(authMiddleware)

// Routes
userRouter.patch("/updateProfile", updateUserProfile)
userRouter.delete("/deleteAccount", deleteUserAccount)
