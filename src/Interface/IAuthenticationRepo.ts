import { NewAccountUser, RefreshToken, getAccountUser, getUser } from "../Type/User";

export interface IAuthenticationRepository{
    registerUser(firstName:string,lastName:string,profilePic:string | null,idProof:string | null,mobileNo:string,emailId:string,password:string,status:string):Promise<NewAccountUser>;
    getUserbyEmailId(emailId:string):Promise<getAccountUser>;
    createRefreshToken(userId:BigInt|null,token:string):Promise<void>;
    getRefreshToken(userId:BigInt | null,token:string):Promise<RefreshToken>;
    getAllUser():Promise<getUser>;
}