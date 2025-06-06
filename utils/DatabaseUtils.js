class DatabaseUtils {
	static async beginTransaction(client) {
		await client.query("BEGIN");
	}
	static async commitTransaction(client) {
		await client.query("COMMIT");
	}
	static async rollbackTransaction(client) {
		await client.query("ROLLBACK");
	}
	static async withTransaction(connection, callback) {
		const client = await connection.connect();
		try {
			await this.beginTransaction(client);
			const result = await callback(client);
			await this.commitTransaction(client);
			return result;
		} catch (error) {
			await this.rollbackTransaction(client);
			throw error;
		} finally {
			client.release();
		}
	}
}

export default DatabaseUtils;
