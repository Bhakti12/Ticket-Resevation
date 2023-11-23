import { inject, injectable } from "inversify";
import { IAuthenticationRepository } from "../Interface/IAuthenticationRepo";
import { IAuthenticationService } from "../Interface/IAuthenticationService";
import {
  NewAccountUser,
  getAccountUser,
  getUser,
  login,
  userToken,
} from "../Type/User";
import { TYPES } from "../Config/types";
import { AllError } from "../Error/ErrorCases";
import crypto, { CipherKey } from "crypto";
import { config } from "../Config/env";
import cipher from "crypto";
import { IRoleRepository } from "../Interface/IRoleRepo";
import { IJwtService } from "../Interface/IJwtService";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  private _authRepo: IAuthenticationRepository;
  private _roleRepo: IRoleRepository;
  private _jwtService: IJwtService;
  constructor(
    @inject(TYPES.AuthenticationRepository)
    authRepository: IAuthenticationRepository,
    @inject(TYPES.RoleRepository) roleRepo: IRoleRepository,
    @inject(TYPES.JwtService) jwtservice: IJwtService
  ) {
    this._authRepo = authRepository;
    this._roleRepo = roleRepo;
    this._jwtService = jwtservice;
  }

  async registerUser(data: NewAccountUser): Promise<NewAccountUser> {
    console.log("inside account service");
    // const key = crypto.randomBytes(32);
    // const IV = crypto.randomBytes(16);
    const Key = config.KEY;
    const IV = config.IV;
    let cipher = crypto.createCipheriv("aes-256-cbc", Key, IV);
    //cipher.setAutoPadding(true);
    const encrypted =
      cipher.update(data.password, "utf8", "hex") + cipher.final("hex");
    const saltIV = IV.toString();
    const user: any = await this._authRepo.registerUser(
      data.firstName,
      data.lastName,
      data.profilePic,
      data.idProof,
      data.mobileNo,
      data.emailId,
      encrypted,
      data.status
    );

    //assigning a role
    const addRoleToUser = await this._roleRepo.addRole(user._id, "User");
    console.log("User service", user);
    console.log("add role", addRoleToUser);
    return user;
  }

  async loginAccount(email: string, password: string): Promise<any> {
    const user = await this._authRepo.getUserbyEmailId(email);
    console.log("user", user);

    if (user.status === "Inactive") {
      throw new AllError("User is Inactive", "Bad Request");
    }

    const key = config.KEY;
    const IV = config.IV;
    //console.log("IV", IV);
    let cipher = crypto.createCipheriv("aes-256-cbc", key, IV);
    //cipher.setAutoPadding(true);
    const encrypted =
      cipher.update(password, "utf8", "hex") + cipher.final("hex");

    console.log(encrypted);
    console.log(user.password);

    if (encrypted !== user.password) {
      throw new AllError("Incorrect details", "Bad Request");
    }

    const getRole = await this._roleRepo.getroleById(user.userId);

    if (user.status === "Active") {
      //create a jwt token
      const data: userToken = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailId,
        role: getRole.roleName,
      };

      const accessToken = await this._jwtService.generateToken(
        data,
        config.ACCESS_TOKEN_KEY,
        config.ACCESS_TOKEN_EXPIRES_IN
      );

      console.log("accessTOken", accessToken);

      const refreshToken = await this._jwtService.generateToken(
        data,
        config.REFRESH_TOKEN_KEY,
        config.REFRESH_TOKEN_EXPIRES_IN
      );

      console.log("refresh token", refreshToken);

      console.log("userId", user.userId);
      await this._authRepo.createRefreshToken(user.userId, refreshToken);
      //console.log(token);

      //set LastLoginAt
      await this._authRepo.setUserLastLogin(user.userId);
      //console.log("set time and date",set);

      const loginDetails: login = {
        userId: user.userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
        emailId: user.emailId,
      };

      return loginDetails;
    }
  }

  async refreshToken(userId: BigInt, refreshToken: string): Promise<string> {
    const token = await this._authRepo.getRefreshToken(userId, refreshToken);

    if (!token) {
      throw new AllError("Invalid refresh token provided!", "Not Found");
    }

    const user: getAccountUser = this._jwtService.verifyToken(
      refreshToken,
      config.REFRESH_TOKEN_KEY
    ) as getAccountUser;

    if (user.userId !== userId) {
      throw new AllError("Invalid user found", "Not Found");
    }

    const getRole = await this._roleRepo.getroleById(userId);

    const data: userToken = {
      userId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailId,
      role: getRole.roleName,
    };

    const newAccessToken = this._jwtService.generateToken(
      data,
      config.ACCESS_TOKEN_KEY,
      config.ACCESS_TOKEN_EXPIRES_IN
    );

    return newAccessToken;
  }

  async doLogOut(userId: BigInt, refreshToken: string): Promise<boolean> {
    const user = await this._authRepo.getUserById(userId);

    if (user === null) {
      throw new AllError("No user exist with this Id", "Bad Request");
    }

    await this._authRepo.deleteRefreshToken(userId, refreshToken);

    await this._authRepo.setUserLastLogOut(userId);

    return true;
  }

  async forgotPassword(emailId: string, isInvite: boolean): Promise<boolean> {
    const user = await this._authRepo.getUserbyEmailId(emailId);

    if (!user) {
      throw new AllError("No user exist with this emailId", "Bad Request");
    }

    const nonce = crypto.randomBytes(64).toString("hex");

    const hashNode = crypto
      .pbkdf2Sync(nonce, config.IV, 1000, 64, "sha512")
      .toString("hex");

    if (isInvite) {
      console.log("emailId is sent");
    } else {
      this._authRepo.forgotPassword(user.userId, emailId, hashNode);
    }

    return true;
  }

  async resetPassword(
    userId: BigInt,
    password: string,
    nonce: string,
    isChange: boolean
  ): Promise<boolean> {
    const user = await this._authRepo.getUserById(userId);

    if (!user) {
      throw new AllError("No user exist with this Id", "Bad Request");
    }

    const hashNode = crypto
      .pbkdf2Sync(nonce, config.IV, 1000, 64, "sha512")
      .toString("hex");

    if (isChange) {
      const sendInvite = { nonce }; //TODO : Will add one method to send inviteby userId
      if (!sendInvite) {
        throw new AllError(
          "can not send request to change password for the given user",
          "Bad Request"
        );
      }
      if (hashNode !== sendInvite.nonce) {
        throw new AllError("Invalid request to change password", "Bad Request");
      }
    } else {
      const forgotPassword = await this._authRepo.getForgotPassword(userId);

      if (!forgotPassword) {
        throw new AllError(
          "cannot find request to reset password for the given user",
          "Bad Request"
        );
      }

      if (hashNode !== forgotPassword.nonce) {
        throw new AllError("Invalid request to reset password", "Bad Request");
      }
    }

    const hashPassword = crypto
      .pbkdf2Sync(password, config.IV, 1000, 64, "sha512")
      .toString("hex");
    await this._authRepo.updatePassword(userId, hashPassword);

    return true;
  }
}
