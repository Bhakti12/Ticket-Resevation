import { AllError } from "../Error/ErrorCases";
import { IRoleRepository } from "../Interfaces/IRoleRepo";
const roleSchema =  require("../Model/roleSchema");

export default class roleRepository implements IRoleRepository{
    
    async addRole(userId: BigInt, roleName: string): Promise<any> {
        try{
            const addRole = await roleSchema.create({
                roleName,
                userId
            });    
            return addRole; 
        }catch(err){
            console.log(err);
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }   
    }

    async getRoleByName(role: string): Promise<any> {
        try{
            const getRole = await roleSchema.findOne({
                roleName:role 
            });

            if(role === null){
                throw new AllError('Role not found','Not Found');
            }

            return {getRole};
        }catch(err){
            console.log(err);
            throw new AllError('An error occured while interacting with the database','Internal Server Error');
        }
    }   
}