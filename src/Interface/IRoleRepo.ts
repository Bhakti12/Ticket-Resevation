export interface IRoleRepository{
    addRole(userId:BigInt,roleName:string): Promise<any>;
    getRoleByName(roleName : string):Promise<any>;
    getroleById(userId:BigInt):Promise<any>;
}