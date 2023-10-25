import { injectable } from "inversify";
import { ITestRepository } from "../Interfaces/ITestRepo";
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
        }catch(err){
            console.log("err in testrepo",err);
        }
    }
}