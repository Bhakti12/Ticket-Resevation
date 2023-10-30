import mongoose from "mongoose";
var Schema = mongoose.Schema;

const roleSchema = new mongoose.Schema({
    roleName : {
        type : String
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model(
    'Role',
    roleSchema,
    'Role'
);