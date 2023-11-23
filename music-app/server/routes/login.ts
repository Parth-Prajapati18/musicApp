import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import sql, { Request as SqlRequest, NVarChar } from 'mssql';
import config from '../db/db';

dotenv.config();
const router: Router = express.Router();

let connection: sql.ConnectionPool;

const checkCredentialsDB = async (username: any, password: any): Promise<boolean> => {
    try {
        connection = await sql.connect(config);
        console.log('SQL has been connected');

        const request = new SqlRequest(connection);
        request.input('username', NVarChar, username)

        const result = await request.query('SELECT Password FROM Users WHERE Username=@username');

        const compare = await bcrypt.compare(password, result.recordset[0].Password);

        console.log(result.recordset[0].Password, password);

        return compare;

    } catch (error) {
        console.error('Error checking credentials:', error);
        throw new Error('Error checking credentials');
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
};

const checkUserDB = async (username: any): Promise<boolean> => {
    try {
        connection = await sql.connect(config);
        console.log('SQL has been connected');

        const request = new SqlRequest(connection);
        request.input('username', NVarChar, username);

        const result = await request.query('SELECT Username FROM Users WHERE Username=@username;');

        console.log('User has been verified');

        return result.rowsAffected[0] !== 0; //Means no Users
    } catch (error) {
        console.error('Error checking user:', error);
        throw new Error('Error checking user');
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
};

router.get('/', async (req: Request, res: Response) => {
    try {
        // Error Check for incoming user details
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.query;

        // Find user from the database
        const userExists = await checkUserDB(username);

        // If user doesn't exist, return an informative message
        if (!userExists) {
            return res.status(401).json({ message: `User '${username}' not found` });
        }

        // Password Match
        const passwordMatch = await checkCredentialsDB(username, password);

        // Invalid Password
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        // Jwt generation
        const token = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(200).json({ token, message: `User '${username}' has successfully logged in` });
    } catch (error) {
        console.error('Error processing login request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;