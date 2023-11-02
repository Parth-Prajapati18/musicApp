import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', (req: any, res: any): void => {
    res.send("TypeScript With Express Parth");
});

export default router;