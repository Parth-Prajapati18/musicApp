import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
const bcrypt = require('bcrypt');

dotenv.config();

interface User {
    username: string;
    passwordHash: string;
}
export const users: User[] = [];
const router: Router = express.Router();


//Validation Middleware

const validateUserInput = [
    body('username').isString().isLength({ min: 1 }),
    body('password').isString().isLength({ min: 6 }),
];

//Sign up Route

router.post('/', validateUserInput, async (req: Request, res: Response) => {
   
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {username, password} = req.body;

    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
        return res.status(400).json({ message: `User '${username}' already exists` });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser: User = { username, passwordHash };
    users.push(newUser);

    res.json({ message : `User '${username}' has been added successfully`})
})

//Get Route

router.get('/', (req: Request, res: Response): void => {

    res.json({ message : "Send Post request with Username and Password"})
})

export default router;