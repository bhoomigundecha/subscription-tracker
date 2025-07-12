import {Router} from 'express'
import {allUsers, userwithid} from '../controllers/user.controller.js'
const userRouter = Router();

userRouter.get('/', allUsers);


userRouter.get('/:id', userwithid);

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
