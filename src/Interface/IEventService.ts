import { NewEvent, getEvent } from "../Type/Event";

export interface IEventService{
    addEvent(data : NewEvent):Promise<getEvent>;
    getEvent():Promise<getEvent>;
    getEventById(eventId:BigInt):Promise<getEvent>;
    editEvent(data : NewEvent, userId : BigInt):Promise<getEvent>;
    statusChangeOfEvent(eventId : BigInt, status : string):Promise<getEvent>;
}