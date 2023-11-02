import { injectable } from "inversify";
import { AllError } from "../Error/ErrorCases";
import { IAdminRepository } from "../Interface/IAdminRepository";
import { getUser } from "../Type/User";
import { getAllEvents } from "../Type/Event";
const roleSchema = require("../Model/roleSchema");
const userSchema = require("../Model/userSchema");
const eventSchema = require("../Model/eventSchema");

@injectable()
export default class AdminRepository implements IAdminRepository {
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

  async changeUserStatus(userId: BigInt, status: string): Promise<any> {
    try {
      const changeStatus = await userSchema.updateOne(
        {
          _id: userId,
        },
        {
          status: status,
        }
      );
      return changeStatus;
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async getAllEvents(): Promise<getAllEvents> {
    try {
      const events = await eventSchema.find({}).populate({
        path: "userId",
        model: "User",
        select: { firstName: 1, lastName: 1, emailId: 1 },
      });
      console.log("events", events);
      return events.filter((res)=>{
        return res._id,
        res.eventName,
        res.eventDescription,
        res.location,
        res.mapLink,
        res.startDate,
        res.endDate,
        res.registrationStartDate,
        res.registrationEndDate,
        res.price,
        res.posterImages,
        res.availableSeats,
        res.eventStatus,
        res.userId._id,
        res.userId.firstName + " " + res.userId.lastName,
        res.createdAt,
        res.updatedAt
      });
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }
}
