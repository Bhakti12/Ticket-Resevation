import { injectable } from "inversify";
import { AllError } from "../Error/ErrorCases";
import { IEventRepository } from "../Interface/IEventRepo";
import { NewEvent, getEvent } from "../Type/Event";
const eventSchema = require("../Model/eventSchema");

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
        userId: userId
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
    try{
      const getEvent = await eventSchema.find({});
      return getEvent;
    }catch(err){
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

  async getEventById(eventId: BigInt): Promise<getEvent> {
    try{
      const getEventbyUserId = await eventSchema.findOne({
        _id : eventId
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
      return {eventId,eventName,eventDescription,location,mapLink,startDate,endDate,registrationStartDate,registrationEndDate,price,posterImages,availableSeats,eventStatus,userId};
    }catch(err){
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }

}
