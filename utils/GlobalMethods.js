class GlobalMethods {
	static responsePayload(payload, remarks, message, code) {
		const status = {
			remarks: remarks,
			message: message,
		};

		return {
			status: status,
			payload: payload,
			timestamp: new Date().toISOString(),
			prepared_by: "YOUR NAME",
			status_code: code,
		};
	}

	static success(payload, message = "Success") {
		return this.responsePayload(payload, "success", message, 200);
	}

	static error(payload = null, message = "Error occurred") {
		return this.responsePayload(payload, "failed", message, 400);
	}

	static unauthorized(message = "Unauthorized access") {
		return this.responsePayload(null, "failed", message, 401);
	}

	static notFound(message = "Resource not found") {
		return this.responsePayload(null, "failed", message, 404);
	}
}

export default GlobalMethods;
