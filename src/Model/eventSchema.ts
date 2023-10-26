import mongoose from "mongoose";
var Schema = mongoose.Schema;

var eventSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    eventName : {
        type : String
    },
    eventDescription : {
        type : String
    },
    location : {
        type : String
    },
    mapLink : {
        type : String
    },
    startDate : {
        type : Date
    },
    endDate : {
        type : Date
    },
    registrationStartDate : {
        type : Date
    },
    registrationEndDate : {
        type : Date
    },
    price : {
        type : Number
    },
    posterImages : {
        type : String
    },
    availableSeats : {
        type : Number
    },
    eventStatus : {
        type : String
    },
    eventAdminStatus : {
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
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model(
    'Event',
    eventSchema,
    'Event'
);