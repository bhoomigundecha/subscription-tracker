import express from 'express';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';

import connectToDatabase from './database/mongodb.js'; 
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import workflowRouter from './routes/workflow.route.js';
const app = express();

app.use(errorMiddleware)
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended : false}));


app.use('/api/v1/auth', authRouter)
// prepending api/v1/auth/sign-up
// api/v1/auth/sign-in
app.use('/api/v1/subscription', subscriptionRouter)
app.use('/api/v1/user', userRouter)
app.use('api/v1/workflows', workflowRouter);



app.get('/', (req,res)=>{
    res.send("Welcome to the Subscritpion Tracker API")
});

app.listen(PORT, async ()=>{
    console.log(`Subscription Tracker is listening on ${PORT}`);

    await connectToDatabase();
});



export default app;