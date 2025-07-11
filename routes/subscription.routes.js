import { Router } from 'express';

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


subscriptionRouter.post("/", (req,res)=>{
    res.send({
        title : 'CREATE all subscriptions'
    })
});

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