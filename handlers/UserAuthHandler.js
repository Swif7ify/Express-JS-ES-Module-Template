import GlobalMethods from "../utils/GlobalMethods.js"; // FOR RESPONSE PAYLOAD
import DatabaseUtils from "../utils/DatabaseUtils.js"; // FOR TRANSACTION AND COMMIT
import argon2 from "argon2"; // FOR PASSWORD HASHING
import crypto from "crypto"; // FOR GENERATING SALT

// import PostgresSQLConnection from "../services/postgres-service.js";  // CONNECTION FROM DATABASE
import { getTimeInTimezone } from "../utils/TimeUtils.js"; // FOR TIMEZONE MANAGEMENT

// const connection = PostgresSQLConnection(); // Assuming PostgresSQLConnection is a function that returns a connection pool

class UserAuthHandler {
	static async register(firstname, lastname, email, password) {
		const client = await connection.connect();
		try {
			await DatabaseUtils.beginTransaction(client);
			const existingUser = await client.query(
				"SELECT * FROM users WHERE email = $1",
				[email]
			);

			if (existingUser.rows.length > 0) {
				const user = existingUser.rows[0];

				if (!user.email_verified) {
					await client.query("DELETE FROM users WHERE id = $1", [
						user.id,
					]);
				} else {
					await DatabaseUtils.rollbackTransaction(client);
					return GlobalMethods.responsePayload(
						null,
						"exist",
						"Email Already Exists",
						409
					);
				}
			}

			const salt = crypto.randomBytes(16).toString("hex");
			const saltedPassword = password + salt;
			const hashedPassword = await argon2.hash(saltedPassword, {
				type: argon2.argon2id,
				memoryCost: 2048,
				timeCost: 4,
				parallelism: 3,
			});

			const result = await client.query(
				"INSERT INTO users (firstname, lastname, email, password, salt) VALUES ($1, $2, $3, $4, $5) RETURNING id",
				[firstname, lastname, email, hashedPassword, salt]
			);

			const userId = result.rows[0].id;
			const url = process.env.COURSE_URL;
			const msg = `Welcome to BootTek, ${
				(firstname, lastname)
			}! Start your journey by selecting a course.}`;

			await DatabaseUtils.commitTransaction(client);

			return GlobalMethods.responsePayload(
				userId,
				"success",
				"Registration Successfull",
				201
			);
		} catch (error) {
			await DatabaseUtils.rollbackTransaction(client);

			console.log(error);
			return GlobalMethods.responsePayload(
				null,
				"error",
				"Error: " + error.message,
				500
			);
		} finally {
			client.release();
		}
	}
}

export default UserAuthHandler;
