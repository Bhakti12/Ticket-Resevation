import { inject, injectable } from "inversify";
import { IAuthenticationRepository } from "../Interfaces/IAuthenticationRepo";
import { IAuthenticationService } from "../Interfaces/IAuthenticationService";
import { NewAccountUser } from "../Types/User";
import { TYPES } from "../Config/types";

@injectable()
export class AuthenticationService implements IAuthenticationService{

    private _authRepo : IAuthenticationRepository;
    constructor(
        @inject(TYPES.AuthenticationRepository) authRepository : IAuthenticationRepository
    ){
        this._authRepo = authRepository;
    }

   async registerUser(firstName:string,lastName:string,profilePic:string,idProof:string,mobileNo:string,emailId:string,password:string): Promise<NewAccountUser> {
        const user = await this._authRepo.registerUser(firstName,lastName,profilePic,idProof,mobileNo,emailId,password);
        return user;
    }
    
}