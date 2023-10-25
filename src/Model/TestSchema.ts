import mongoose from "mongoose";

var testSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model(
    'Test',
    testSchema,
    'Test'
);