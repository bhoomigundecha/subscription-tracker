import {Router} from 'express'
import {getUser, getUsers} from '../controllers/user.controller.js'
import authorize from '../middlewares/auth.middleware.js';
const userRouter = Router();

userRouter.get('/', getUser);


userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) =>{
    res.send({
        title : 'Create new user'
    })
});

userRouter.put('/:id', (req, res)=>{
    res.send({
        title : 'Update the users'
    })
});

userRouter.delete('/:id', (req, res)=>{
    res.send({
        title : 'Delete a users'
    })
});

export default userRouter
