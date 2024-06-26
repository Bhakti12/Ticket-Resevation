import { ForgotPassword, NewAccountUser, RefreshToken, getAccountUser, getUser } from "../Type/User";

export interface IAuthenticationRepository{
    registerUser(firstName:string,lastName:string,profilePic:string | null,idProof:string | null,mobileNo:string,emailId:string,password:string,status:string):Promise<getAccountUser>;
    getUserbyEmailId(emailId:string):Promise<getAccountUser>;
    createRefreshToken(userId:BigInt|null,token:string):Promise<void>;
    getRefreshToken(userId:BigInt | null,token:string):Promise<RefreshToken>;
    getUserById(userId:BigInt):Promise<getUser>;
    deleteRefreshToken(userId:BigInt,token:string):Promise<void>;
    setUserLastLogOut(userId:BigInt):Promise<void>;
    setUserLastLogin(userId:BigInt):Promise<void>;
    forgotPassword(userId:BigInt,emailId:string,nonce:string):Promise<void>;
    getForgotPassword(userId:BigInt):Promise<ForgotPassword | null>;
    deleteRefreshToken(userId:BigInt,token:string):Promise<void>;
    updatePassword(userId:BigInt,password:string):Promise<void>;
}