import {checkSchema} from "express-validator";

const eventValidator = checkSchema({
    eventName : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        }
    },
    eventDescription : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        }
    },
    location : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        }
    },
    mapLink : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        }
    },
    startDate : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        }
    },
    endDate : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        }
    },
    registrationStartDate : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        }
    },
    registrationEndDate : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        }
    },
    price : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        },
    },
    availableSeats : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        },
        isNumeric:{
            errorMessage : 'should be number'
        }
    },
    eventStatus : {
        in:'body',
        notEmpty:{
            errorMessage : `eventName can't be empty`
        },
    }
});

export default eventValidator;