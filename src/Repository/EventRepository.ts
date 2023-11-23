import { injectable } from "inversify";
import { AllError } from "../Error/ErrorCases";
import { IEventRepository } from "../Interface/IEventRepo";
import { NewEvent, getEvent } from "../Type/Event";
const eventSchema = require("../Model/eventSchema");
import { ObjectId } from "mongodb";

@injectable()
export default class eventRepository implements IEventRepository {
  
  async addEvent(data: NewEvent): Promise<getEvent> {
    try {
      const eventName = data.eventName;
      const eventDescription = data.eventDescription;
      const location = data.location;
      const mapLink = data.mapLink;
      const startDate = data.startDate;
      const endDate = data.endDate;
      const registrationStartDate = data.registrationStartDate;
      const registrationEndDate = data.registrationEndDate;
      const price = data.price;
      const posterImages = data.posterImages;
      const availableSeats = data.availableSeats;
      const eventStatus = data.eventStatus;
      const userId = data.userId;
      const addEvent = await eventSchema.create({
        eventName: eventName,
        eventDescription: eventDescription,
        location: location,
        mapLink: mapLink,
        startDate: startDate,
        endDate: endDate,
        registrationStartDate: registrationStartDate,
        registrationEndDate: registrationEndDate,
        price: price,
        posterImages: posterImages,
        availableSeats: availableSeats,
        eventStatus: eventStatus,
        userId: userId,
      });
      return addEvent;
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async getEvent(): Promise<getEvent> {
    try {
      const getEvent = await eventSchema.find({});
      return getEvent;
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async getEventById(eventId: BigInt): Promise<getEvent> {
    try {
      const getEventbyUserId = await eventSchema.findById({
        _id: eventId,
      });
      const eventName = getEventbyUserId.eventName;
      const eventDescription = getEventbyUserId.eventDescription;
      const location = getEventbyUserId.location;
      const mapLink = getEventbyUserId.mapLink;
      const startDate = getEventbyUserId.startDate;
      const endDate = getEventbyUserId.endDate;
      const registrationStartDate = getEventbyUserId.registrationStartDate;
      const registrationEndDate = getEventbyUserId.registrationEndDate;
      const price = getEventbyUserId.price;
      const posterImages = getEventbyUserId.posterImages;
      const availableSeats = getEventbyUserId.availableSeats;
      const eventStatus = getEventbyUserId.eventStatus;
      const userId = getEventbyUserId.userId;
      return {
        eventId,
        eventName,
        eventDescription,
        location,
        mapLink,
        startDate,
        endDate,
        registrationStartDate,
        registrationEndDate,
        price,
        posterImages,
        availableSeats,
        eventStatus,
        userId,
      };
    } catch (err) {
      console.log("inside get event by id error",err);
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async editEvent(data: NewEvent, eventId: BigInt): Promise<getEvent> {
    try {
      let dataTobeUpdate: NewEvent = {
        eventName: data.eventName,
        eventDescription: data.eventDescription,
        location: data.location,
        mapLink: data.mapLink,
        startDate: data.startDate,
        endDate: data.endDate,
        registrationStartDate: data.registrationStartDate,
        registrationEndDate: data.registrationEndDate,
        price: data.price,
        posterImages: data.posterImages,
        availableSeats: data.availableSeats,
        eventStatus: data.eventStatus,
        userId: data.userId,
      };
      const editEvent = await eventSchema.findByIdAndUpdate(
        {
          _id: eventId,
        },
        dataTobeUpdate,
        {
          new: true,
        }
      );
      return editEvent;
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async statusChangeOfEvent(
    eventId: BigInt,
    status: string
  ): Promise<getEvent> {
    try {
      const changeStatus = await eventSchema.findByIdAndUpdate(
        {
          _id: eventId,
        },
        {
          eventStatus: status,
        }
      );
      return {
        eventId: changeStatus._id,
        eventName: changeStatus.eventName,
        eventDescription: changeStatus.eventDescription,
        location: changeStatus.location,
        mapLink: changeStatus.mapLink,
        startDate: changeStatus.startDate,
        endDate: changeStatus.endDate,
        registrationStartDate: changeStatus.registrationStartDate,
        registrationEndDate: changeStatus.registrationEndDate,
        price: changeStatus.price,
        posterImages: changeStatus.posterImages,
        availableSeats: changeStatus.availableSeats,
        eventStatus: changeStatus.eventStatus,
        userId: changeStatus.userId,
      };
    } catch (err) {
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async deleteEvent(eventId: BigInt): Promise<any> {
    try {
      console.log("inside this");
      const deleteEventById = await eventSchema.findByIdAndDelete({
        _id : eventId
      });
      console.log(deleteEventById);
      return deleteEventById;
    } catch (err) {
      console.log(err);
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async searchEvent(): Promise<any> {
    try{
      throw new Error("Method not implemented.");
    }catch(err){
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }
  
}