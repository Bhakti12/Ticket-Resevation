import express from "express";
import { injectable } from "inversify";
import { ITestService } from "../Interfaces/ITestService";
import { TYPES } from "../Config/types";
import globalSuccessHandler from "../Error/globalSuccessHandler";
import { AllError } from "../Error/ErrorCases";
import { AppError } from "../Error/ErrorHandler";

export default class TestController extends globalSuccessHandler{

    private _testService : ITestService;

    constructor(
        testService : ITestService
    ){
        super();
        this._testService = testService;
    }

    async testMethod(req:express.Request,res:express.Response){
        try{
            const id = req.body.id;
            console.log("in controller");
            const getData = await this._testService.getTest(id);
            if(getData){
                this.sendJsonResponse(res,'data',{length : 1},getData);
            }
            else{
                new AllError('Data Not Found', 'Not Found');
            }
        }
        catch(err:any){
            this.sendErrorResponse(req,res,err);    
        }
    }
}