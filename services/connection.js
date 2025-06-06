// For postgreSQL connection using pg package

// import pkg from "pg";
// const { Pool } = pkg;
// import dotenv from "dotenv";

// dotenv.config({ path: ".env.development" });

// function PostgreSQLConnect() {
// 	const pool = new Pool({
// 		user: process.env.DB_USER,
// 		host: process.env.DB_HOST,
// 		database: process.env.DB_DATABASE,
// 		password: process.env.DB_PASSWORD,
// 		port: process.env.DB_PORT,
// 	});

// 	pool.connect((err, client, release) => {
// 		if (err) {
// 			console.error(
// 				"❌ Error connecting to PostgreSQL database:",
// 				err.message
// 			);
// 		} else {
// 			console.log("✅ Successfully connected to PostgreSQL database!");
// 			release();
// 		}
// 	});

// 	pool.on("error", (err) => {
// 		console.error("❌ Unexpected error on idle client", err);
// 	});

// 	return pool;
// }

// export default PostgreSQLConnect;



// =================


// for mysql connection using mysql2 package

// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config({ path: ".env.development" });

// function MySQLConnect() {
//     const pool = mysql.createPool({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         port: process.env.DB_PORT,
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0,
//         acquireTimeout: 60000,
//         timeout: 60000,
//         reconnect: true
//     });

//     // Test the connection
//     pool.getConnection()
//         .then(connection => {
//             console.log("✅ Successfully connected to MySQL database!");
//             connection.release();
//         })
//         .catch(err => {
//             console.error("❌ Error connecting to MySQL database:", err.message);
//         });

//     // Handle pool errors
//     pool.on('connection', (connection) => {
//         console.log('New connection established as id ' + connection.threadId);
//     });

//     pool.on('error', (err) => {
//         console.error('❌ Unexpected error on idle client', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.log('Database connection was closed.');
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.log('Database has too many connections.');
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.log('Database connection was refused.');
//         }
//     });

//     return pool;
// }

// export default MySQLConnect;