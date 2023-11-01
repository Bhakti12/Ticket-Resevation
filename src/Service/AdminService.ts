import { inject, injectable } from "inversify";
import { IAdminRepository } from "../Interface/IAdminRepository";
import { IAdminService } from "../Interface/IAdminService";
import { getUser } from "../Type/User";
import { TYPES } from "../Config/types";
import { getAllEvents } from "../Type/Event";
import { AllError } from "../Error/ErrorCases";
import { IRoleRepository } from "../Interface/IRoleRepo";
import { IAuthenticationRepository } from "../Interface/IAuthenticationRepo";

@injectable()
export default class AdminService implements IAdminService{

    private _adminRepo : IAdminRepository;
    private _roleRepo : IRoleRepository;
    private _authRepo : IAuthenticationRepository;

    constructor(
        @inject(TYPES.AdminRepository) adminRepo : IAdminRepository,
        @inject(TYPES.RoleRepository) roleRepo : IRoleRepository,
        @inject(TYPES.AuthenticationRepository) authRepo : IAuthenticationRepository
    ){
        this._adminRepo = adminRepo;
        this._roleRepo = roleRepo;
        this._authRepo = authRepo;
    }
    
    async getAllUser(): Promise<getUser> {
        const allUser = await this._adminRepo.getAllUser();
        return allUser;
    }

    async getAllEvents(): Promise<getAllEvents> {
        throw new Error("Method not implemented.");
    }

    async chnageUserStatus(userId: BigInt, status: string): Promise<any> {
        const user = await this._authRepo.getUserById(userId);
    
        const getRole = await this._roleRepo.getroleById(userId);
    
        if (user === null) {
          throw new AllError("No user exist with this Id", "Bad Request");
        }
    
        const statusChange = await this._adminRepo.changeUserStatus(userId, status);
    
        return statusChange;
      }
}