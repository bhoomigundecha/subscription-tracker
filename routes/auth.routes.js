import { Router } from 'express';
const authRouter = Router();
import { signUp, signOut, signIn } from "../controllers/auth.controller.js"

authRouter.post('/sign-up', signUp);

authRouter.post('/sign-out', (req, res)=>{
    res.send({
        title : 'Sign-out'
    })
});

authRouter.post('/sign-in', signIn);

export default authRouter