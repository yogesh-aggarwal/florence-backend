import { Router } from "express"

import authLogin from "./login"
import authLoginWithGoogle from "./loginWithGoogle"
import authSignup from "./signup"

export const authRouter = Router()

authRouter.post("/login", authLogin)
authRouter.post("/signup", authSignup)
authRouter.post("/loginWithGoogle", authLoginWithGoogle)
