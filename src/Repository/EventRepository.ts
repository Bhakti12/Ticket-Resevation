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
      throw new Error("not implemented");
    }catch(err){
      throw new AllError(
        "An error occured while interacting with the database",
        "Internal Server Error"
      );
    }
  }
}
