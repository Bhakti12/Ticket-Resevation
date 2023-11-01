import { NewAccountUser, getUser, login } from "../Type/User";

export interface IAuthenticationService{
    registerUser(data:NewAccountUser):Promise<NewAccountUser>;
    loginAccount(emailId:string,password:string):Promise<any>;
    refreshToken(userId:BigInt,refreshToken:string):Promise<string>;
    getAllUser():Promise<getUser>;
    chnageUserStatus(userId:BigInt,token:string):Promise<any>;
    doLogOut(userId:BigInt,status:string): Promise<boolean>;
}