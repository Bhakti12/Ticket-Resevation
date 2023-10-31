/* eslint-disable import/no-cycle */
import express from 'express';
import { iocContainer as Container } from '../Config/container';
import { TYPES } from '../Config/types';
import { IEventService } from '../Interface/IEventService';
import eventController from '../Controller/EventController';
import eventValidator from '../Validator/eventValidator';

const router = express.Router();
const eventService = Container.get<IEventService>(TYPES.EventService);
const EventController = new eventController(eventService);

router.get('/add-event',eventValidator, (req, res) => EventController.addEvent(req,res));

export default router;