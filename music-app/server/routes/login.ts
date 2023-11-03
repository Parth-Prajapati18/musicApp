import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { users } from './signup';
import { validationResult } from 'express-validator';
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

dotenv.config();
const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {

    // Error Check for incoming user details 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {username, password} = req.query;

    //Find user from users array
    const user = users.find((user)=> user.username === username)

    //If user doesn't exist, return msg
    if (!user) {
        return res.status(401).json({ message: `User '${username}' not found` });
    }

    //Password Match
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)

    //Invalid Password
    if(!passwordMatch) {
        return res.status(401).json({ Message : 'Invalid Passowrd'});
    }

    //Jwt generation
    const token = jwt.sing({ username }, process.env.JWT_SECRET, { expiresIn: '1h' } )

    res.status(200).json({ token, Message : `User '${username}' has successfully logged In` })

})

export default router;