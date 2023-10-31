import express from "express";
import globalSuccessHandler from "../Error/globalSuccessHandler";
import { IAuthenticationRepository } from "../Interface/IAuthenticationRepo";
import { inject, injectable } from "inversify";
import { TYPES } from "../Config/types";
import { IAuthenticationService } from "../Interface/IAuthenticationService";

@injectable()
export default class adminController extends globalSuccessHandler{
    
    private _authService : IAuthenticationService;
    
    constructor(@inject(TYPES.AuthenticationService) authService : IAuthenticationService){
        super();
        this._authService = authService;
    }

    async getAllUser(req:express.Request,res:express.Response){
        try{
            const allUser = await this._authService.getAllUser();
            this.sendJsonResponse(res,'all users',{length : 1},allUser);
        }catch(err){
            this.sendErrorResponse(req,res,err);
        }
    }

    async changeUserStatus(req:express.Request,res:express.Response){
        try{
            const { userId,status } = req.body;
            const stausChange = await this._authService.chnageUserStatus(userId,status);
            this.sendJsonResponse(res,'status change',{length:1},stausChange);
        }catch(err){
            this.sendErrorResponse(req,res,err);
        }
    }
}