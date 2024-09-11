import nodemailer from "nodemailer"
import { MAIL_GMAIL_AUTH_ID, MAIL_GMAIL_AUTH_PASSWORD } from "../../../../core/constants"
import { Mail_t } from "./mail.types"

export async function sendEmail(mailOptions: Mail_t) {
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: MAIL_GMAIL_AUTH_ID,
         pass: MAIL_GMAIL_AUTH_PASSWORD,
      },
   })

   try {
      await transporter.sendMail(mailOptions)
   } catch (error) {
      console.error("Error occurred while sending email:", error)
   }
}
