import express from "express";
import globalSuccessHandler from "../Error/globalSuccessHandler";
import { IEventService } from "../Interface/IEventService";
import { TYPES } from "../Config/types";
import { inject } from "inversify";
import { NewEvent } from "../Type/Event";

export default class eventController extends globalSuccessHandler {
  private _eventService: IEventService;

  constructor(@inject(TYPES.EventService) eventService: IEventService) {
    super();
    this._eventService = eventService;
  }

  async addEvent(req: express.Request, res: express.Response) {
    try {
      const {
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
      } = req.body;

      const newEvent: NewEvent = {
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
      };

      const addEve = await this._eventService.addEvent(newEvent);

      this.sendJsonResponse(
        res,
        "Event Added Successfully!",
        { length: 1 },
        addEve
      );
    } catch (err) {
      this.sendErrorResponse(req, res, err);
    }
  }
}
