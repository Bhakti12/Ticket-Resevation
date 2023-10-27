import { NewAccountUser } from "../Types/User";

export interface IAuthenticationService{
    registerUser(data:NewAccountUser):Promise<NewAccountUser>;
    loginAccount(data:any):Promise<any>;
}