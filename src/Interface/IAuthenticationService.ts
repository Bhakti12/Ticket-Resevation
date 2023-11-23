import { NewAccountUser, getUser, login } from "../Type/User";

export interface IAuthenticationService{
    registerUser(data:NewAccountUser):Promise<NewAccountUser>;
    loginAccount(emailId:string,password:string):Promise<any>;
    refreshToken(userId:BigInt,refreshToken:string):Promise<string>;
    doLogOut(userId:BigInt,status:string): Promise<boolean>;
    forgotPassword(emailId:string,isInvite:boolean):Promise<boolean>;
    resetPassword(userId:BigInt,password:string,nonce:string,isChange:boolean):Promise<boolean>;
}