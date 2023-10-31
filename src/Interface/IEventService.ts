import { NewEvent, getEvent } from "../Type/Event";

export interface IEventService{
    addEvent(data : NewEvent):Promise<getEvent>;
}