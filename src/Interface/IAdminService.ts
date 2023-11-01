import { getAllEvents } from "../Type/Event";
import { getUser } from "../Type/User";

export interface IAdminService{
    getAllUser():Promise<getUser>;
    getAllEvents():Promise<getAllEvents>;
    chnageUserStatus(userId:BigInt,token:string):Promise<any>;
}