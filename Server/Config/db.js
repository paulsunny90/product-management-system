import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const connectDB = () => {
    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) {
                console.log("MySQL connection failed", err.message);
                reject(err);
            } else {
                console.log("  MySQL Connected Successfully");
                resolve(db);
            }
        });
    });
};
