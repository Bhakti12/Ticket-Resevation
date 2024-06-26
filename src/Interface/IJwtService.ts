import { userToken } from "../Type/User";

export interface IJwtService{
    generateToken(data:userToken,secret:string,expiresIn:string):Promise<string>;
    verifyToken(token : string, secret : string):string | object;
}