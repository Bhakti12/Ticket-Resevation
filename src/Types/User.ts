export declare type NewAccountUser = {
    firstName : string,
    lastName : string,
    profilePic : string | null,
    idProof : string | null,
    mobileNo : string,
    emailId : string,
    password : string,
    status : string,
    salt?: string
};

export declare type RefreshToken = {
    userId : BigInt | null,
    refreshToken : string,
    createdAt : Date
}