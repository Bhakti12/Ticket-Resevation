import { getUser } from "../Type/User";

export interface IAdminRepository{
    getAllUser():Promise<getUser>;
}