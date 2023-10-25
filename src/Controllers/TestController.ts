import express from "express";
import { injectable } from "inversify";
import { ITestService } from "../Interfaces/ITestService";
import { TYPES } from "../Config/types";

export default class TestController{

    private _testService : ITestService;

    constructor(
        testService : ITestService
    ){
        this._testService = testService;
    }

    async testMethod(req:express.Request,res:express.Response){
        try{
            const id = req.body.id;
            console.log("in controller");
            const getData = await this._testService.getTest(id);
            if(getData){
                res.send(getData);
            }
        }
        catch(err){
            console.log("error in test controller",err);
        }
    }
}