import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
const bcrypt = require('bcryptjs');
import dotenv from 'dotenv';
import config from '../db/db';
import { RowDataPacket } from 'mysql2';

dotenv.config();

const router: Router = express.Router();
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

interface User {
    username: string;
    passwordHash: string;
}

// Database service
const getPool = async () => {
    try {
        const pool = await config.getConnection();
        console.log('MySQL has been connected');
        return pool;
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error;
    }
};

const addusertodb = async (username: string, passwordHash: string) => {
    const pool = await getPool();
    try {
        const [rows] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, passwordHash]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        await pool.release();
    }
};

const checkuserdb = async (username: string): Promise<boolean> => {
    const pool = await getPool();
    try {
        const [rows] = await pool.query('SELECT username FROM users WHERE username=?', [username])as unknown as [RowDataPacket[]];
        return rows.length > 0;
    } catch (error) {
        throw error;
    } finally {
        await pool.release();
    }
};

// Validation Middleware
const validateUserInput = [
    body('username').isString().isLength({ min: 1 }),
    body('password').isString().isLength({ min: 6 }),
];

// Routes
router.post('/', validateUserInput, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const existingUser = await checkuserdb(username);

        if (existingUser) {
            return res.status(400).json({ message: `User '${username}' already exists` });
        }

        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser: User = { username, passwordHash };

        await addusertodb(newUser.username, newUser.passwordHash);
        res.json({ message: `User '${username}' has been added successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

router.get('/', (req: Request, res: Response) => {
    res.json({ message: "Send Post request with Username and Password" });
});

export default router;
