import { NewAccountUser } from "../Types/User";

export interface IAuthenticationRepository{
    registerUser(firstName:string,lastName:string,profilePic:string,idProof:string,mobileNo:string,emailId:string,password:string):Promise<NewAccountUser>;
}