import mysql from 'mysql2/promise';
import { config as configDotenv } from 'dotenv';
configDotenv();

const connection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

try {
    const conn = await connection.getConnection();
    console.log("Database successfully connected");
    conn.release();
} catch (err) {
    console.error("Error while connecting to database:", err);
}

export default connection;
