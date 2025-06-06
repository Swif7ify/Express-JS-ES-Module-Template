import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

class EmailUtils {
	static transporter = null;

	static initializeTransporter() {
		if (!this.transporter) {
			this.transporter = nodemailer.createTransport({
				host: process.env.MAIL_HOST,
				port: process.env.MAIL_PORT,
				secure: process.env.MAIL_ENCRYPTION === "ssl",
				auth: {
					user: process.env.MAIL_USERNAME,
					pass: process.env.MAIL_PASSWORD,
				},
				tls: {
					rejectUnauthorized: false, //change to true in production
				},
			});
		}
		return this.transporter;
	}

	static async sendEmail(to, subject, htmlContent, textContent = null) {
		try {
			const transporter = this.initializeTransporter();

			const mailOptions = {
				from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
				to: to,
				subject: subject,
				html: htmlContent,
				text: textContent || htmlContent.replace(/<[^>]*>/g, ""),
			};

			const info = await transporter.sendMail(mailOptions);

			console.log("✅ Email sent successfully:", info.messageId);
			return {
				success: true,
				messageId: info.messageId,
				message: "Email sent successfully",
			};
		} catch (error) {
			console.error("❌ Email sending failed:", error);
			return {
				success: false,
				error: error.message,
			};
		}
	}
}

export default EmailUtils;
