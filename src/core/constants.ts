import { config } from "dotenv"

config()

export const ALLOWED_ORIGINS: string[] = [process.env.ALLOWED_ORIGIN || ""]
if (!ALLOWED_ORIGINS[0]) {
	console.error("Missing ALLOWED_ORIGIN")
	process.exit(1)
}

export const MONGO_URI: string = process.env.MONGO_URI || ""
if (!MONGO_URI) {
	console.error("Missing MONGO_URI")
	process.exit(1)
}

export const JWT_SECRET: string = process.env.JWT_SECRET || ""
if (!JWT_SECRET) {
	console.error("Missing JWT_SECRET")
	process.exit(1)
}

export const PORT: string = process.env.PORT || ""
if (!PORT) {
	console.error("Missing PORT")
	process.exit(1)
}

export const GCP_OAUTH_CLIENT_ID: string = process.env.GCP_OAUTH_CLIENT_ID || ""
if (!GCP_OAUTH_CLIENT_ID) {
	console.error("Missing GCP_OAUTH_CLIENT_ID")
	process.exit(1)
}

export const MAIL_GMAIL_AUTH_ID: string = process.env.MAIL_GMAIL_AUTH_ID || ""
if (!MAIL_GMAIL_AUTH_ID) {
	console.error("Missing MAIL_GMAIL_ID")
	process.exit(1)
}

export const MAIL_GMAIL_AUTH_PASSWORD: string =
	process.env.MAIL_GMAIL_AUTH_PASSWORD || ""
if (!MAIL_GMAIL_AUTH_PASSWORD) {
	console.error("Missing MAIL_GMAIL_AUTH_PASSWORD")
	process.exit(1)
}

export const RAZORPAY_KEY_ID: string = process.env.RAZORPAY_KEY_ID || ""
if (!RAZORPAY_KEY_ID) {
	console.error("Missing RAZORPAY_KEY_ID")
	process.exit(1)
}

export const RAZORPAY_SECRET: string = process.env.RAZORPAY_SECRET || ""
if (!RAZORPAY_SECRET) {
	console.error("Missing RAZORPAY_SECRET")
	process.exit(1)
}
