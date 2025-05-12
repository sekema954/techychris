//User subscription emails model

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    email:{type:String, required: true},
}, {timestamps: true});

const Subscription_emails = mongoose.model("Subscription_emails", subscriptionSchema);
module.exports = Subscription_emails;