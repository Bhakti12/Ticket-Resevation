import { getAllEvents, getEvent } from "../Type/Event";
import { getUser } from "../Type/User";

export interface IAdminRepository{
    getAllUser():Promise<getUser>;
    getAllEvents():Promise<getAllEvents>;
    changeUserStatus(userId:BigInt,status:string):Promise<any>;
}