import crypto from "crypto";
//import cryptos = require("crypto");
import {DatabaseConnection} from "./db";
import {config}  from "./env";
import mongoose from "mongoose";
const userSchema = require("../Model/userSchema");
const roleSchema = require("../Model/roleSchema");

async function initializeDatabase(){
    try{
        await DatabaseConnection();

        console.log("inside initalization database function");
        
        const Key = config.KEY;
        const IV = config.IV;
        let cipher = crypto.createCipheriv('aes-256-cbc', Key, IV);
        //cipher.setAutoPadding(true);
        const encrypted = cipher.update('admin@123', 'utf8', 'hex') + cipher.final('hex');
        
        const createAdmin = await userSchema.create({
            firstName : 'can',
            lastName : 'yaman',
            profilePic : null,
            idProof : null,
            adddress : 'Ankara',
            password : encrypted,
            mobileNo : '1234567890',
            emailId : 'can.y@yopmail.com',
            status : 'Active'
        });
    
        const createRole = await roleSchema.create({
            roleName : 'Admin',
            userId : createAdmin.id
        });
    }catch(err){
        console.log(err);
    }finally{
        mongoose.connection.close();
    }
}

initializeDatabase();