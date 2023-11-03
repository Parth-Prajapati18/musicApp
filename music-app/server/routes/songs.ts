import express, { Request, Response, Router, response } from 'express';
import dotenv from 'dotenv';
const jwt =  require('jsonwebtoken');

dotenv.config();

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {

    const token = req.header('Authorization')?.split('')[1];

    if(!token) {
        return res.status(401).json({ message : "No token Provided"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        res.json({ message: 'Protected route accessed', user: decoded });
    });
});

