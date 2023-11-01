/* eslint-disable import/no-cycle */
import express from "express";
import { iocContainer as Container } from "../Config/container";
import { TYPES } from "../Config/types";
import { IEventService } from "../Interface/IEventService";
import eventController from "../Controller/EventController";
import eventValidator from "../Validator/eventValidator";
import passport from "../Config/passport";

const router = express.Router();
const eventService = Container.get<IEventService>(TYPES.EventService);
const EventController = new eventController(eventService);

router.post(
  "/add-event",
  passport.authenticate("jwt", { session: false }),
  eventValidator,
  (req, res) => EventController.addEvent(req, res)
);

router.get(
  "/get-event",
  passport.authenticate("jwt", { session: false }),
  (req, res) => EventController.getEvent(req, res)
);

export default router;
