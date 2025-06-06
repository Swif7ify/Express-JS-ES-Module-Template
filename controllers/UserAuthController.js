import UserAuthHandler from "../handlers/UserAuthHandler.js";
import GlobalMethods from "../utils/GlobalMethods.js";

class UserAuthController {
	// ==== HELPER ====
	static handleError(res, error, statusCode = 500) {
		const errorResponse = GlobalMethods.responsePayload(
			null,
			"error",
			error.message,
			statusCode
		);
		return res.status(statusCode).json(errorResponse);
	}

	static handleValidationError(res, message) {
		const errorResponse = GlobalMethods.responsePayload(
			null,
			"error",
			message,
			400
		);
		return res.status(400).json(errorResponse);
	}

	// ==== CONTROLLER METHODS ====

	// example of a user registration method
	static async register(req, res) {
		try {
			const input = req.body;
			if (
				!input.firstname ||
				!input.lastname ||
				!input.email ||
				!input.password
			) {
				return this.handleValidationError(res, "Fields are required");
			}

			const result = await UserAuthHandler.register(
				input.firstname,
				input.lastname,
				input.email,
				input.password
			);

			return res.status(result.status_code).json(result);
		} catch (error) {
			return this.handleError(res, error);
		}
	}
}

export default UserAuthController;
