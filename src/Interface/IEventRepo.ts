import { NewEvent, getEvent } from "../Type/Event";

export interface IEventRepository{
    addEvent(data : NewEvent):Promise<getEvent>;
    getEvent():Promise<getEvent>;
}