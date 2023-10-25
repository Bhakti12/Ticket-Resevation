import { injectable,inject } from "inversify";
import { ITestRepository } from "../Interfaces/ITestRepo";
import { ITestService } from "../Interfaces/ITestService";
import { TYPES } from "../Config/types";

@injectable()
export class TestService implements ITestService{
    
    private _testRepository : ITestRepository;
    
    constructor(
        @inject(TYPES.TestRepository) testRepository : ITestRepository
    ){
        this._testRepository = testRepository;
    }

    async getTest(id:string): Promise<any> {
        try{
            const getData = await this._testRepository.getTest(id);
            console.log(getData);
        }catch(err){
            console.log("error in test service",err);
        }
    }
    
}