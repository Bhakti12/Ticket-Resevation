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
      return {
        eventId: events.eventId,
        eventName: events.eventName,
        eventDescription: events.eventDescription,
        location: events.location,
        mapLink: events.mapLink,
        startDate: events.startDate,
        endDate: events.endDate,
        registrationStartDate: events.registrationStartDate,
        registrationEndDate: events.registrationEndDate,
        price: events.price,
        posterImages: events.posterImages,
        availableSeats: events.availableSeats,
        eventStatus: events.eventStatus,
        userId: events.userId,
        userName: events.userName,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
      };
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }
}
