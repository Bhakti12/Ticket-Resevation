import { NewAccountUser, getUser } from "../Type/User";

export interface IAuthenticationService{
    registerUser(data:NewAccountUser):Promise<NewAccountUser>;
    loginAccount(emailId:string,password:string):Promise<any>;
    refreshToken(userId:BigInt,refreshToken:string):Promise<string>;
    getAllUser():Promise<getUser>;
}