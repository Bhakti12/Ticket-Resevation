import mongoose from "mongoose";
var Schema = mongoose.Schema;

const forgetPasswordSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId, 
        ref : 'User'
    },
    emailId : {
        type : String
    },
    nonce : {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date
    }
});

module.exports = mongoose.model(
    'Forget-Password',
    forgetPasswordSchema,
    'Forget-Password'
);