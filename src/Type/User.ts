export declare type NewAccountUser = {
    //userId? : BigInt,
    firstName : string,
    lastName : string,
    profilePic : string | null,
    idProof : string | null,
    mobileNo : string,
    emailId : string,
    password : string,
    status : string
};

export declare type login = {
    userId : BigInt,
    accessToken : string,
    refreshToken : string,
    emailId : string
};

export declare type getAccountUser = {
    userId : BigInt,
    firstName : string,
    lastName : string,
    profilePic : string | null,
    idProof : string | null,
    mobileNo : string,
    emailId : string,
    password : string,
    status : string
};

export declare type RefreshToken = {
    userId : BigInt | null,
    refreshToken : string,
    createdAt : Date
}

export declare type getUser = {
    firstName : string,
    lastName : string,
    profilePic : string | null,
    idProof : string | null,
    mobileNo : string,
    emailId : string,
    status : string  
}

export declare type userToken = {
    userId : BigInt,
    firstName : string,
    lastName : string,
    email : string,
    role : string
}