import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Subscription name is required"],
        trim : true, 
        minLength : 2,
        maxLength : 100,
    },
    price : {
        type : Number, 
        required : [true, 'Subscription price is required'],
        min : [0, 'Price must be greater than zero']
    },

    currency : {
        type : String, 
        enum : ['USD', 'EUR', 'GBP'], 
        default : 'USD'
    },

    frequency : {
        type : String, 
        enum : ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category : {
        type : String, 
        enum : ['Sports', 'News', 'Entertainment', 'Lifestyle', 'Technology', 'Finance', 'Politics', 'Other'],
    },
    paymentMethod : {
        type : String,
        required : true, 
        trim : true,
    }, 
    status : {
        type : String,
        enum : ['active', 'cancelled', 'expired'],
        default : 'active'
    },
    startDate : {
        type : Date,
        required : true,
        validate : {
            validator : (value) => value <= new Date(),
            message : "Start date must be in the past", 

        }
    },
    renewalDate : {
        type : Date,
        required : true,
        validate : {
            validator : function(value) {
                value > this.startDate;
            },
            message : "Renewal date must be greater than start date", 
                   
        }
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true, 
        index : true, 
        
    }
},  {timestamps : true});



const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription