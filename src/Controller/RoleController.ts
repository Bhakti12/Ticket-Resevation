import express from "express";
import globalSuccessHandler from "../Error/globalSuccessHandler";
import { IRoleRepository } from "../Interface/IRoleRepo";
import { IRoleService } from "../Interface/IRoleService";

export default class RoleController extends globalSuccessHandler{

    private _roleService : IRoleService;

    constructor(
        roleService : IRoleService
    ){
        super();
        this._roleService = roleService;
    }

    async addRole(req:express.Request,res:express.Response){
        try{
            const {userId,roleName} = req.body;
            const saveRole = await this._roleService.addRole(userId,roleName);
            return this.sendJsonResponse(
                res,
                "Role created successfully!",
                {
                    length : 1
                },
                saveRole
            );
        }catch(err){
            console.log(err);
            this.sendErrorResponse(req,res,err);
        }
    }
}