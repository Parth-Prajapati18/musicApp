import express, { Request, Response, Router } from 'express';
import config from '../db/db';

const router: Router = express.Router();

// A function to get the database pool connection
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

router.get('/', async (req: Request, res: Response) => {
    try {
        const pool = await getPool();

        try {
            const [rows] = await pool.query('SELECT * FROM audiobooks');
            // Properly close the connection
            pool.release();

            // Sending the response back to the client
            res.json({ success: true, audiobooks: rows });
        } catch (dbError) {
            console.error('Database query error:', dbError);
            // Handling database errors
            res.status(500).json({ success: false, message: 'Database query failed' });
        }
    } catch (connError) {
        // Handling connection errors
        res.status(500).json({ success: false, message: 'Failed to connect to database' });
    }
});

export default router;
