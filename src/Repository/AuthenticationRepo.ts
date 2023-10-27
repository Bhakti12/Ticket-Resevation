import { injectable } from "inversify";
import { IAuthenticationRepository } from "../Interfaces/IAuthenticationRepo";
import { NewAccountUser } from "../Types/User";
import { AllError } from "../Error/ErrorCases";
const userSchema = require("../Model/userSchema");
import bcrypt from "bcrypt";

@injectable()
export class AuthenticationRepository implements IAuthenticationRepository{
    async registerUser(firstName:string,lastName:string,profilePic:string | null,idProof:string | null,mobileNo:string,emailId:string,password:string): Promise<NewAccountUser> {
        try{
            console.log("inside accountrepo");
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password.toString(),salt);
            const User = await userSchema.create({
                    firstName,
                    lastName,
                    profilePic,
                    idProof,
                    mobileNo,
                    emailId,
                    password:hashPassword
            });
            console.log("user",User);
            console.log(User.firstName,User.lastName,User.profilePic,User.idProof,User.emailId);
            return User;
        }catch(err){
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }
    }   
}