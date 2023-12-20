import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import pool from '../db/db';

dotenv.config();
const router: Router = express.Router();

const checkCredentialsDB = async (username: string, password: string): Promise<boolean> => {
    let connection: mysql.PoolConnection | undefined;

    try {
        connection = await pool.getConnection();
        const query1 = 'SELECT password FROM users WHERE username = ?';
        const [rows] = await connection.execute(query1, [username]) as unknown as [RowDataPacket[]];

        if (rows.length === 0) {
            return false; // User not found
        }

        const compare = await bcrypt.compare(password, rows[0].password);
        return compare;
    } catch (error) {
        console.error('Error checking credentials:', error);
        throw error; // Or handle the error as needed
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const checkUserDB = async (username: string): Promise<boolean> => {
    let connection: mysql.PoolConnection | undefined;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT username FROM users WHERE username = ?', [username]) as unknown as [RowDataPacket[]];
        return rows.length !== 0; // Means user exists
    } catch (error) {
        console.error('Error checking user:', error);
        throw error; // Or handle the error as needed
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

router.get('/', async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.query as { username: string; password: string };

        const userExists = await checkUserDB(username);
        if (!userExists) {
            return res.status(401).json({ message: `User '${username}' not found` });
        }

        const passwordMatch = await checkCredentialsDB(username, password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.status(200).json({ token, message: `User '${username}' has successfully logged in` });
    } catch (error) {
        console.error('Error processing login request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
