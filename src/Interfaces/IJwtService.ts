import { userToken } from "../Types/User";

export interface IJwtService{
    generateToken(data:userToken,secret:string,expiresIn:string):Promise<string>;
    verifyToken(token : string, secret : string):string | object;
}