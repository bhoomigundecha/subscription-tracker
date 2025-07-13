import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req,res)=>{
    res.send({
        title : 'GET all subscriptions'
    })
});

subscriptionRouter.post("/:id", (req,res)=>{
    res.send({
        title : 'GET subscriptions details'
    })
});


subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/", (req,res)=>{
    res.send({
        title : 'Update all subscriptions'
    })
});

subscriptionRouter.delete("/:id", (req,res)=>{
    res.send({
        title : 'Delete a subscriptions'
    })
});

subscriptionRouter.get("/user/:id", (req,res)=>{
    res.send({
        title : 'get all user subscriptions'
    })
});

subscriptionRouter.put("/:id/cancel", (req,res)=>{
    res.send({
        title : 'cancel a subscriptions'
    })
});

subscriptionRouter.get("/upcoming-renewals", (req,res)=>{
    res.send({
        title : 'upcoming renewal'
    })
});

export default subscriptionRouter