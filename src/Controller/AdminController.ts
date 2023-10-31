import express from "express";
import globalSuccessHandler from "../Error/globalSuccessHandler";

export default class adminController extends globalSuccessHandler{
    async getAllUser(req:express.Request,res:express.Response){
        try{
            
        }catch(err){
            this.sendErrorResponse(req,res,err);
        }
    }
}