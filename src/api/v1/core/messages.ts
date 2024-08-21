export enum ResponseMessages {
	SUCCESS = "Success",
	INVALID_REQUEST = "Invalid request",
	INVALID_BODY_CONTENT = "Invalid body contents",

	INTERNAL_SERVER_ERROR = "Internal server error",

	AUTH_INVALID = "Invalid authentication",
	AUTH_USER_DOES_NOT_EXIST = "User does not exist",
	AUTH_PASSWORD_INVALID = "Password is invalid",

	RESOURCE_ALREADY_EXISTS = "Resource already exists",
	RESOURCE_DOES_NOT_EXISTS = "Resource does not exist",
	INVALID_RESOURCE_ID = "Invalid resource id",
}
