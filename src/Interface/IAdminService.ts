import { getUser } from "../Type/User";

export interface IAdminService{
    getAllUser():Promise<getUser>;
}