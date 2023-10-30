import mongoose from "mongoose";
var Schema = mongoose.Schema;

const refreshTokenSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    token : {
        type : String,
        required : true
    },
    createdAT : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model(
    'refreshToken',
    refreshTokenSchema,
    'refreshToken'
);