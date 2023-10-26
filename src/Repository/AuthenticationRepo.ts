import { injectable } from "inversify";
import { IAuthenticationRepository } from "../Interfaces/IAuthenticationRepo";
import { NewAccountUser } from "../Types/User";
import { AllError } from "../Error/ErrorCases";
const userSchema = require("../Model/userSchema");

@injectable()
export class AuthenticationRepository implements IAuthenticationRepository{
    async registerUser(firstName:string,lastName:string,profilePic:string,idProof:string,mobileNo:string,emailId:string,password:string): Promise<NewAccountUser> {
        try{
            const User = await userSchema.create({
                data : {
                    firstName,
                    lastName,
                    profilePic,
                    idProof,
                    mobileNo,
                    emailId,
                    password
                }
            });
            return User;
        }catch(err){
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }
    }
    
}