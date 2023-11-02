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
        userId,
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
        userId: userId,
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

  async getEvent(req: express.Request, res: express.Response) {
    try {
      const getEvent = await this._eventService.getEvent();
      this.sendJsonResponse(
        res,
        "Events successfully fetched",
        { length: 1 },
        getEvent
      );
    } catch (err) {
      console.log(err);
      this.sendErrorResponse(req, res, err);
    }
  }

  async getEventById(req: express.Request, res: express.Response) {
    try {
      const { eventId } = req.body;
      const getEVent = await this._eventService.getEventById(eventId);
      this.sendJsonResponse(res, "event found!", { length: 1 }, getEVent);
    } catch (err) {
      this.sendErrorResponse(req, res, err);
    }
  }

  async editEvent(req: express.Request, res: express.Response) {
    try {
    } catch (err) {
      this.sendErrorResponse(req, res, err);
    }
  }

  async changeStatusOfEvent(req: express.Request, res: express.Response) {
    try {
      const { eventId, status } = req.body;
      const changeStatus = await this._eventService.statusChangeOfEvent(
        eventId,
        status
      );
      this.sendJsonResponse(res, "status changed", { length: 1 }, changeStatus);
    } catch (err) {
      this.sendErrorResponse(req, res, err);
    }
  }
}
