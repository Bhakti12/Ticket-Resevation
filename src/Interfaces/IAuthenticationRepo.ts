import { NewAccountUser } from "../Types/User";

export interface IAuthenticationRepository{
    registerUser(firstName:string,lastName:string,profilePic:string | null,idProof:string | null,mobileNo:string,emailId:string,password:string,status:string):Promise<NewAccountUser>;
    loginAccount(emailId:string,password:string):Promise<any>;
}