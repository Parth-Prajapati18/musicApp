import express from 'express';
import signupRouter from './routes/signup'
import indexRouter from './routes/index'
import loginRouter from './routes/login'

const app: express.Application = express();
const port: number = 3000;

app.use(express.json());
app.use('/', indexRouter)
app.use('/signup', signupRouter);
app.use('/login', loginRouter)
 


// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});