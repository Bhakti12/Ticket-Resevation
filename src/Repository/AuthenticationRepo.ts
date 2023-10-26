import { injectable } from "inversify";
import { IAuthenticationRepository } from "../Interfaces/IAuthenticationRepo";
import { NewAccountUser } from "../Types/User";
import { AllError } from "../Error/ErrorCases";
const userSchema = require("../Model/userSchema");

@injectable()
export class AuthenticationRepository implements IAuthenticationRepository{
    async registerUser(firstName:string,lastName:string,profilePic:string | null,idProof:string | null,mobileNo:string,emailId:string,password:string): Promise<NewAccountUser> {
        try{
            const User = await userSchema.create({
                    firstName,
                    lastName,
                    profilePic,
                    idProof,
                    mobileNo,
                    emailId,
                    password
            });
            console.log("user",User);
            console.log(User.firstName,User.lastName,User.profilePic,User.idProof);
            return User;
        }catch(err){
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }
    }   
}