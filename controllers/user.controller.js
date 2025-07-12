import mongoose from 'mongoose';
import User from '../models/user.model.js';

export const allUsers = async(req, res, next) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({error:"Failed to catch users"});
    }
}

export const userwithid = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({
            error : 'User not found'
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error : 'Failed to fetch users'});
    }
}