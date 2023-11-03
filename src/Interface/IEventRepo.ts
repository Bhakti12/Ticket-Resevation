import { NewEvent, getEvent } from "../Type/Event";

export interface IEventRepository{
    addEvent(data : NewEvent):Promise<getEvent>;
    getEvent():Promise<getEvent>;
    getEventById(eventId:BigInt):Promise<getEvent>;
    editEvent(data : NewEvent, eventId : BigInt):Promise<getEvent>;
    statusChangeOfEvent(eventId : BigInt ,status : string):Promise<getEvent>;
    deleteEvent(eventId : BigInt): Promise<any>;
}