import express from "express";
import globalSuccessHandler from "../Error/globalSuccessHandler";
import { IAuthenticationRepository } from "../Interface/IAuthenticationRepo";
import { inject, injectable } from "inversify";
import { TYPES } from "../Config/types";
import { IAuthenticationService } from "../Interface/IAuthenticationService";
import { IAdminService } from "../Interface/IAdminService";

@injectable()
export default class adminController extends globalSuccessHandler{
    
    private _authService : IAuthenticationService;
    private _adminService : IAdminService;
    
    constructor(@inject(TYPES.AuthenticationService) authService : IAuthenticationService,
    @inject(TYPES.AdminService) adminService : IAdminService){
        super();
        this._authService = authService;
        this._adminService = adminService;
    }

    async getAllUser(req:express.Request,res:express.Response){
        try{
            const allUser = await this._adminService.getAllUser();
            this.sendJsonResponse(res,'all users',{length : 1},allUser);
        }catch(err){
            this.sendErrorResponse(req,res,err);
        }
    }

    async changeUserStatus(req:express.Request,res:express.Response){
        try{
            const { userId,status } = req.body;
            const stausChange = await this._adminService.chnageUserStatus(userId,status);
            this.sendJsonResponse(res,'status change',{length:1},stausChange);
        }catch(err){
            this.sendErrorResponse(req,res,err);
        }
    }

    async getAllEvents(req:express.Request,res:express.Response){
        try{
            
        }catch(err){
            this.sendErrorResponse(req,res,err);
        }
    }
}