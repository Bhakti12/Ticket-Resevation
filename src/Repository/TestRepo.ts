import { injectable } from "inversify";
import { ITestRepository } from "../Interface/ITestRepo";
import { AllError } from "../Error/ErrorCases";
import globalSuccessHandler from "../Error/globalSuccessHandler";
const ObjectID = require('mongodb').ObjectID;
const testSchema = require("../Model/TestSchema");

@injectable()
export class TestRepository implements ITestRepository{
    
    async getTest(id:string):Promise<any>{
        try{    
            const getData = await testSchema.findById({
                _id : id
        });
            console.log("test data repo",getData);
            if(getData == null){
               throw new AllError('Data not found','Not Found');
            }
            return getData;
        }catch(err){
            if(err instanceof AllError){
                throw err;
            }
            throw new AllError('Db not connected','Internal Server Error');
            //console.log("err in testrepo",err);
        }
    }
}