import express, { Request, Response }  from 'express';
import signupRouter from './routes/signup'
import indexRouter from './routes/index'
import loginRouter from './routes/login'
import audiobookRouter from './routes/songsdb'
const app: express.Application = express();
const port: number = 3000;

app.use((req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());
app.use('/', indexRouter)
app.use('/signup', signupRouter);
app.use('/login', loginRouter)
app.use('/audiobook', audiobookRouter )

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});