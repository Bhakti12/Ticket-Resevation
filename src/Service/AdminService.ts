import { inject, injectable } from "inversify";
import { IAdminRepository } from "../Interface/IAdminRepository";
import { IAdminService } from "../Interface/IAdminService";
import { getUser } from "../Type/User";
import { TYPES } from "../Config/types";

@injectable()
export default class AdminService implements IAdminService{

    private _adminRepo : IAdminRepository;

    constructor(
        @inject(TYPES.AdminRepository) adminRepo : IAdminRepository
    ){
        this._adminRepo = adminRepo;
    }

    async getAllUser(): Promise<getUser> {
        const allUser = await this._adminRepo.getAllUser();
        return allUser;
      }
}