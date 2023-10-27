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

   async registerUser(data:NewAccountUser): Promise<NewAccountUser> {
        console.log("inside account service");
        const user = await this._authRepo.registerUser(data.firstName,data.lastName,data.profilePic,data.idProof,data.mobileNo,data.emailId,data.password);
        console.log("User service",user);
        return user;
    }
    
}