import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    profilePic : {
        type : String
    },
    idProof : {
        type : String
    },
    address : {
        type : String
    },
    password : {
        type : String
    },
    mobileNo : {
        type : String
    },
    emailId : {
        type : String
    },
    status : {
        type : String
    },
    salt : {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    },
    isDelete : {
        type : Number
    },
    lastLoginAt : {
        type : Date
    }
});

module.exports = mongoose.model(
    'User',
    userSchema,
    'User'
);