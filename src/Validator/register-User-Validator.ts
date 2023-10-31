import {checkSchema} from "express-validator";

const registerUser = checkSchema({
    firstName : {
        in:'body',
        notEmpty:{
            errorMessage : `firstName can't be empty`
        }
    },
    lastName : {
        in:'body',
        notEmpty:{
            errorMessage : `firstName can't be empty`
        }
    },
    emailId: {
        in: 'body',
        toLowerCase: true,
        exists: {
            errorMessage: 'Email address is required.',
        },
        notEmpty: {
            errorMessage: 'Email address cannot be empty.',
        },
        isLength: {
            options: {
                min: 1,
                max: 256,
            },
        },
        isEmail: {
            errorMessage: 'Email id is invalid.',
        },
        trim: true,
        stripLow: true,
    },
    password: {
        in: 'body',
        exists: {
            errorMessage: 'Password is required.',
        },
        notEmpty: {
            errorMessage: 'Password cannot be empty.',
        },
        isLength: {
            options: {
                min: 8,
            },
            errorMessage: 'Password should be mininum 8 characters long.',
        },
        trim: true,
        stripLow: true,
    }
});

export default registerUser;