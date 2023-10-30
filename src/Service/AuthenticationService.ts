import { inject, injectable } from "inversify";
import { IAuthenticationRepository } from "../Interfaces/IAuthenticationRepo";
import { IAuthenticationService } from "../Interfaces/IAuthenticationService";
import { NewAccountUser } from "../Types/User";
import { TYPES } from "../Config/types";
import { AllError } from "../Error/ErrorCases";
import crypto, { CipherKey } from "crypto";
import { config } from "../Config/env";
import cipher from "crypto";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  private _authRepo: IAuthenticationRepository;
  constructor(
    @inject(TYPES.AuthenticationRepository)
    authRepository: IAuthenticationRepository
  ) {
    this._authRepo = authRepository;
  }

  async registerUser(data: NewAccountUser): Promise<NewAccountUser> {
    console.log("inside account service");
    // const key = crypto.randomBytes(32);
    // const IV = crypto.randomBytes(16);
    const Key = config.KEY;
    const IV = config.IV;
    let cipher = crypto.createCipheriv('aes-256-cbc', Key, IV);
    //cipher.setAutoPadding(true);
    const encrypted = cipher.update(data.password, 'utf8', 'hex') + cipher.final('hex');
    const saltIV = IV.toString();
    const user = await this._authRepo.registerUser(
      data.firstName,
      data.lastName,
      data.profilePic,
      data.idProof,
      data.mobileNo,
      data.emailId,
      encrypted,
      data.status,
      saltIV
    );
    console.log("User service", user);
    return user;
  }

  async loginAccount(email: string, password: string): Promise<any> {
    
    const user = await this._authRepo.getUserbyEmailId(email);
    const key = config.KEY;
    const IV = config.IV;
    console.log("IV",IV);
    let cipher = crypto.createCipheriv("aes-256-cbc", key, IV);
    //cipher.setAutoPadding(true);
    const encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');

    console.log(encrypted);
    console.log(user.password);

    if(encrypted !== user.password){
        throw new AllError('Incorrect details','Bad Request');
    }
  }
}
