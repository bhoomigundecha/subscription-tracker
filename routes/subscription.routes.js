import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscription, updateSubscription, deleteSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.post("/", authorize, createSubscription);    // Creating a subscription 

subscriptionRouter.get("/user/:id", authorize, getUserSubscription);   // Reading the user subscription 

subscriptionRouter.put("/", authorize, updateSubscription);    // Updating the user subscription 

subscriptionRouter.delete("/:id", authorize, deleteSubscription);     // delete a subscription 


// har subscription ki alag id banti hai 


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