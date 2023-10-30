import { inject, injectable } from "inversify";
import { IRoleService } from "../Interfaces/IRoleService";
import { IRoleRepository } from "../Interfaces/IRoleRepo";
import {TYPES} from "../Config/types";

@injectable()
export default class roleService implements IRoleService{
    
    private _roleRepo : IRoleRepository;

    constructor(
        @inject(TYPES.RoleRepository) roleRepo : IRoleRepository
    ){
        this._roleRepo = roleRepo;
    }

    async addRole(userId: BigInt, roleName: string): Promise<any> {
        await this._roleRepo.addRole(userId,roleName);
    }

    async getRoleByName(roleName: string): Promise<any> {
        await this._roleRepo.getRoleByName(roleName);
    }
    
}