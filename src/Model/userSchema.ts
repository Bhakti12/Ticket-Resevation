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
    email : {
        type : String
    },
    accountStatus : {
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
    }
});

module.exports = mongoose.model(
    'User',
    userSchema,
    'User'
);