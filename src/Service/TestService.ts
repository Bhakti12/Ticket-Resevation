import { injectable,inject } from "inversify";
import { ITestRepository } from "../Interfaces/ITestRepo";
import { ITestService } from "../Interfaces/ITestService";
import { TYPES } from "../Config/types";
import { AllError } from "../Error/ErrorCases";

@injectable()
export class TestService implements ITestService{
    
    private _testRepository : ITestRepository;
    
    constructor(
        @inject(TYPES.TestRepository) testRepository : ITestRepository
    ){
        this._testRepository = testRepository;
    }

    async getTest(id:string): Promise<any> {
        const getData = await this._testRepository.getTest(id);
        return getData;
    }
    
}