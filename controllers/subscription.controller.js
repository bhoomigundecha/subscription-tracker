import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async(req, res, next) =>{
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user : req.user._id, 
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,

            // If params are expected separately:
            params: {
                subscriptionId: subscription.id,
            },

            body: JSON.stringify({
                subscriptionId: subscription.id,
                userId: req.user.id,  // optionally include more if needed
                reminderDate: new Date().toISOString(),
            }),

            headers: {
                'content-type': 'application/json',
            },

            retries: 0,
        });

        res.status(201).json({success:true,data:subscription,   workflowRunId: workflowRunId || null});
    }catch(error){
        next(error);
    }
}

export const getUserSubscription = async(req, res, next) => {
    try{
        if(req.user.id !== req.params.id){
            const error = new Error("You are not the owner of the account");
            error.status = 401;
        }
        const subscription = await Subscription.find({user : req.params.id});
        res.status(200).json({success:true, data:subscription});
    }catch(error){
        next(error);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        const { subscriptionId, ...updates } = req.body;

        if (!subscriptionId) {
            return res.status(400).json({ success: false, message: "subscriptionId is required" });
        }

        const subscription = await Subscription.findById(subscriptionId);
        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        // Authorization: Only owner can update
        if (subscription.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to update this subscription" });
        }
        Object.keys(updates).forEach(key=>{
            subscription[key] = updates[key];
        });

        await subscription.save();
        res.status(200).json({success : true, message:"Subscription updated", data:subscription});
    }catch(error){
        next(error);
    }
}

export const deleteSubscription = async(req,res, next)=>{
    try{

    }catch(error){
        next(error);
    }
}