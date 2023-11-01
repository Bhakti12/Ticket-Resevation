import { injectable } from "inversify";
import { AllError } from "../Error/ErrorCases";
import { IAdminRepository } from "../Interface/IAdminRepository";
import { getUser } from "../Type/User";
const roleSchema = require("../Model/roleSchema");

@injectable()
export default class AdminRepository implements IAdminRepository{
    async getAllUser(): Promise<getUser> {
        try {
          const res = await roleSchema
            .find({
              roleName: "User",
            })
            .populate({
              path: "userId",
              model: "User",
            });
          //console.log("res",res);
          return res.filter((user) => {
            console.log("user", user);
            return (
              user.userId.firstName,
              user.userId.lastName,
              user.userId.profilePic,
              user.userId.idProof,
              user.userId.mobileNo,
              user.userId.emailId,
              user.userId.status
            );
          });
        } catch (err) {
          throw new AllError(
            "An error occured while interacting with the database",
            "Internal Server Error"
          );
        }
      }
}