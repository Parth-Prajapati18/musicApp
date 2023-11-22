import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
const bcrypt = require('bcrypt');
import sql from 'mssql';
import config from '../db/db';
dotenv.config();
const router: Router = express.Router();

interface User {
    username: string;
    passwordHash: string;
}

export const users: User[] = [];

// Validation Middleware
const validateUserInput = [
    body('username').isString().isLength({ min: 1 }),
    body('password').isString().isLength({ min: 6 }),
];

// Database service
let connection: sql.ConnectionPool;
const addusertodb = async (username: string, passwordHash: string): Promise<any> => {
        
    try {
        connection = await sql.connect(config);
        console.log('SQL has been connected');

        // Create request object
        const request = new sql.Request();
        request.input('username', sql.NVarChar, username)
               .input('passwordHash', sql.NVarChar, passwordHash);

        // Execute the query
        const result = await request.query('INSERT INTO Users (Username, Password) VALUES (@username, @passwordHash);');
        return result;
    } catch (error) {
        console.error(error);
        throw error; 
    } finally {
        if (connection) {
            try {
                await connection.close();
                console.log('SQL connection has been closed');
            } catch (closeError) {
                console.error('Error closing SQL connection:', closeError);
            }
        }
    }
}

const checkuserdb = async (username: string): Promise<boolean> => {
    try {
        connection = await sql.connect(config);
        console.log('SQL has been connected');
        
        const request = new sql.Request();
        request.input('username', sql.NVarChar, username);

        const result = await request.query('SELECT Username FROM Users WHERE Username=@username;');

        return result.recordsets.length !== 0;

    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        
        if (connection) {
            try {
                await connection.close();
                console.log('SQL connection has been closed');
            } catch (closeError) {
                console.error('Error closing SQL connection:', closeError);
            }
        }
    }
}

// Sign up Route
router.post('/', validateUserInput, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const existingUser = await checkuserdb(username);

    if (existingUser) {
        return res.status(400).json({ message: `User '${username}' already exists` });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser: User = { username, passwordHash };
    
    try {
        const result = await addusertodb(newUser.username, newUser.passwordHash);
        res.json({ message: `User '${username}' has been added successfully`, result });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get Route
router.get('/', (req: Request, res: Response): void => {
    res.json({ message: "Send Post request with Username and Password" });
});

export default router;
