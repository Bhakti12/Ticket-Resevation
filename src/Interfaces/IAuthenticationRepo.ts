import { NewAccountUser, RefreshToken } from "../Types/User";

export interface IAuthenticationRepository{
    registerUser(firstName:string,lastName:string,profilePic:string | null,idProof:string | null,mobileNo:string,emailId:string,password:string,status:string,salt?:string):Promise<NewAccountUser>;
    getUserbyEmailId(emailId:string):Promise<NewAccountUser>;
    createRefreshToken(userId:BigInt|null,token:string):Promise<void>;
    getRefreshToken(userId:BigInt | null,token:string):Promise<RefreshToken>;
    
}