import { injectable } from "inversify";
import { IAuthenticationRepository } from "../Interface/IAuthenticationRepo";
import { NewAccountUser, RefreshToken, getAccountUser, getUser } from "../Type/User";
import { AllError } from "../Error/ErrorCases";
const userSchema = require("../Model/userSchema");
const refreshTokenSchema = require("../Model/refreshTokenSchema");

@injectable()
export class AuthenticationRepository implements IAuthenticationRepository{
    async registerUser(firstName:string,lastName:string,profilePic:string | null,idProof:string | null,mobileNo:string,emailId:string,password:string,status:string): Promise<NewAccountUser> {
        try{
            console.log("inside accountrepo");
            const User = await userSchema.create({
                    firstName,
                    lastName,
                    profilePic,
                    idProof,
                    mobileNo,
                    emailId,
                    password,
                    status
            });
            console.log("user",User);
            console.log(User.firstName,User.lastName,User.profilePic,User.idProof,User.emailId);
            return User;
        }catch(err){
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }
    }
    
    async getUserbyEmailId(email: string): Promise<getAccountUser> {
        try{
            const user = await userSchema.findOne({
                emailId : email
            });
            const userId = user.userId;
            const firstName = user.firstName;
            const lastName = user.lastName;
            const profilePic = user.profilePic;
            const idProof = user.idProof;
            const emailId = user.emailId;
            const mobileNo = user.mobileNo;
            const password = user.password;
            const status = user.status;
            const salt = user.salt;
            return {userId,firstName,lastName,profilePic,idProof,mobileNo,emailId,password,status};
        }catch(err){
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }
    }

    async createRefreshToken(userId: BigInt | null, token: string): Promise<void> {
        try{
            const saveToken = await refreshTokenSchema.create({
                userId,
                token
            });
        }catch(err){
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }       
    }

    async getRefreshToken(userid: BigInt | null, rToken: string): Promise<RefreshToken> {
        try{
            const getToken = await refreshTokenSchema.find({
                userId : userid,
                token : rToken
            });
            return getToken;
        }catch(err){
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }    
    }

    async getAllUser():Promise<getUser>{
        try{
            const res = await userSchema.find();
            const firstName = res.firstName;
            const lastName = res.lastName;
            const profilePic = res.profilePic;
            const idProof = res.idProof;
            const mobileNo = res.mobileNo;
            const emailId = res.emailId;
            const status = res.status;
            return {firstName,lastName,profilePic,idProof,mobileNo,emailId,status};
        }catch(err){
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }
    }

    // async updateStatus():Promise<>{

    // }
}