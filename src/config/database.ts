import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER || 'a61u1xuuzn4',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'i10181616_vpux1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; 