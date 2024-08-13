import bcrypt from "bcrypt"

/**
 * Encyrpts the password using bcrypt's algorithms
 *
 * @param password Plain text form of password
 * @returns Returns the hash of the password
 */
export async function generatePasswordHash(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(5)
	const hash = await bcrypt.hash(password, salt)
	return hash
}

export function validatePassword(password: string): boolean {
	// --- Check 1 ---: At least 1 uppercase letter
	if (password === password.toLowerCase()) {
		return false
	}

	// --- Check 2 ---: Should include at least one number
	let includesNumber = false
	for (let i = 0; i <= 9; i++) {
		includesNumber = includesNumber || password.includes(i.toString())
	}
	if (!includesNumber) {
		return false
	}

	// --- Check 3 ---: Should include at least one special character
	let specialChars = "!@#$%^&*()_+-=/?<>,.[]{}".split("")
	let includesSpecialChar = false
	for (let char of specialChars) {
		includesSpecialChar = includesSpecialChar || password.includes(char)
	}
	if (!includesSpecialChar) {
		return false
	}
	return true
}
