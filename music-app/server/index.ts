import express, { Request, Response }  from 'express';
import signupRouter from './routes/signup'
import indexRouter from './routes/index'
import loginRouter from './routes/login'
const app: express.Application = express();
const port: number = 3000;

app.use((req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(express.json());
app.use('/', indexRouter)
app.use('/signup', signupRouter);
app.use('/login', loginRouter)
 
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});