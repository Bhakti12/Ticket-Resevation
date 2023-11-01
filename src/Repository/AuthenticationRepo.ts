import { injectable } from "inversify";
import { IAuthenticationRepository } from "../Interface/IAuthenticationRepo";
import {
  NewAccountUser,
  RefreshToken,
  getAccountUser,
  getUser,
} from "../Type/User";
import { AllError } from "../Error/ErrorCases";
const userSchema = require("../Model/userSchema");
const roleSchema = require("../Model/roleSchema");
const refreshTokenSchema = require("../Model/refreshTokenSchema");

@injectable()
export class AuthenticationRepository implements IAuthenticationRepository {
  async registerUser(
    firstName: string,
    lastName: string,
    profilePic: string | null,
    idProof: string | null,
    mobileNo: string,
    emailId: string,
    password: string,
    status: string
  ): Promise<getAccountUser> {
    try {
      console.log("inside accountrepo");
      const User = await userSchema.create({
        firstName,
        lastName,
        profilePic,
        idProof,
        mobileNo,
        emailId,
        password,
        status,
      });
      console.log("user", User);
      console.log(
        User.firstName,
        User.lastName,
        User.profilePic,
        User.idProof,
        User.emailId
      );
      return User;
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async getUserbyEmailId(email: string): Promise<getAccountUser> {
    try {
      const user = await userSchema.findOne({
        emailId: email,
      });
      console.log("user repository", user);
      const userId = user._id;
      const firstName = user.firstName;
      const lastName = user.lastName;
      const profilePic = user.profilePic;
      const idProof = user.idProof;
      const emailId = user.emailId;
      const mobileNo = user.mobileNo;
      const password = user.password;
      const status = user.status;
      //const salt = user.salt;
      console.log("userId repository", userId);
      return {
        userId,
        firstName,
        lastName,
        profilePic,
        idProof,
        mobileNo,
        emailId,
        password,
        status,
      };
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async createRefreshToken(
    userId: BigInt | null,
    token: string
  ): Promise<void> {
    try {
      const saveToken = await refreshTokenSchema.create({
        userId,
        token,
      });
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async getRefreshToken(
    userid: BigInt | null,
    rToken: string
  ): Promise<RefreshToken> {
    try {
      const getToken = await refreshTokenSchema.find({
        userId: userid,
        token: rToken,
      });
      return getToken;
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  

  async getUserById(userId: BigInt): Promise<getUser> {
    try {
      const getUser = await userSchema.findOne({
        _id: userId,
      });
      const firstName = getUser.firstName;
      const lastName = getUser.lastName;
      const profilePic = getUser.profilePic;
      const idProof = getUser.idProof;
      const email = getUser.emailId;
      const mobileNo = getUser.mobileNo;
      const status = getUser.status;
      return {
        firstName: firstName,
        lastName: lastName,
        profilePic: profilePic,
        idProof: idProof,
        mobileNo: mobileNo,
        emailId: email,
        status: status,
      };
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async deleteRefreshToken(userId: BigInt, token: string): Promise<void> {
    try {
      const refreshToken = await refreshTokenSchema.deleteOne({
        _id: userId,
        token: token,
      });
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async setUserLastLogOut(userId: BigInt): Promise<void> {
    try {
      const updateDate = await userSchema.updateOne(
        {
          _id: userId,
        },
        {
          lastLogOutAt: new Date(),
        }
      );
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async setUserLastLogin(userId: BigInt): Promise<void> {
    try {
      const updateDate = await userSchema.updateOne(
        {
          _id: userId,
        },
        {
          lastLoginAt: new Date(),
        }
      );
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }
}
