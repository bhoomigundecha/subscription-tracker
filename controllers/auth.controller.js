// explicitly allowing us to focus on the logic of what these features are actually doing 
import mongoose from 'mongoose';
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken'
// Correct usage
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';


export const signUp = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        // Create a new user 
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error('Use already exists');
            error.statusCode = 404;
            throw error;
        }
        // encrypt the password : Hashing 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{name, email, password : hashedPassword}], {session});
        const token = jwt.sign({userId : newUsers[0]._id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success : true,
            message : 'User created successfully',
            data : {
                token, 
                user : newUsers[0]
            }
        })
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async(req, res, next) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('User not found')
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            const error = new Error('Password is incorrect')
            error.statusCode = 401; // unauthorised
            throw error;
        }

        const token = jwt.sign({userId : user._id}, JWT_SECRET, {expiresIn : JWT_EXPIRES_IN});

        res.status(200).json({
            success : true, 
            message : 'User signed in successfully',
            data : {
                token, 
                user,
            }
        });

    }catch(error){
        next(error);
    }
}

export const signOut = async(req, res, next) => {
    
}