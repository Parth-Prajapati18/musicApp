import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { users } from './signup';

dotenv.config();
const router: Router = express.Router();

router.get('/', (req: Request, res: Response): void => {

    const {username, password} = req.query;

    res.json({ Message : "This is END!" })

})

export default router;