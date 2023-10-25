import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { config } from "./env";

export function DatabaseConnection(){
    dotenv.config();

    const DBstring:string = `${String(config.DB)}`;

    mongoose.connect(DBstring).then(()=>{
        console.log("Database Connected successfully");
    }).catch(err => {
        console.log("error in database",err);
    });
}