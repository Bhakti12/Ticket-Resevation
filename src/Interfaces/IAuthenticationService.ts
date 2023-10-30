import { NewAccountUser } from "../Types/User";

export interface IAuthenticationService{
    registerUser(data:NewAccountUser):Promise<NewAccountUser>;
    loginAccount(emailId:string,password:string):Promise<any>;
}