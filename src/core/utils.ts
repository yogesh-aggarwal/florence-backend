import { customAlphabet } from "nanoid"

export function generateNanoid(length: number = 10): string {
   return customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", length)()
}

export function generateNanoidOnlyAlphabets(length: number = 10): string {
   return customAlphabet("abcdefghijklmnopqrstuvwxyz", length)()
}
