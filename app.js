import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

// routes import
// import UserAuthRoutes from "./routes/UserAuthRoutes.js"; // EXAMPLE ROUTE IMPORT

dotenv.config({ path: ".env.development" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	})
);

// routes
// app.use("/api/v1/auth", UserAuthRoutes); // EXAMPLE ROUTE

app.use(function (req, res, next) {
	// res.redirect("https://swif7ify.github.io/boottek-http/404");
	next(createError(404));
});

app.use((err, req, res, next) => {
	const isDevelopment = req.app.get("env") === "development";

	if (req.originalUrl.startsWith("/api/")) {
		return res.status(err.status || 500).json({
			data: null,
			status: "error",
			message: err.message || "Internal server error",
			code: err.status || 500,
			...(isDevelopment && { stack: err.stack }),
		});
	}

	res.locals.message = err.message;
	res.locals.error = isDevelopment ? err : {};
	res.locals.title = "Error";

	res.status(err.status || 500);
	res.render("error");
});
export default app;
