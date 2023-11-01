import { inject, injectable } from "inversify";
import { IEventRepository } from "../Interface/IEventRepo";
import { IEventService } from "../Interface/IEventService";
import { NewEvent, getEvent } from "../Type/Event";
import { TYPES } from "../Config/types";

@injectable()
export default class eventService implements IEventService{
    
    private _eventRepo : IEventRepository;

    constructor(@inject(TYPES.EventRepository) eventRepo : IEventRepository){
        this._eventRepo = eventRepo;
    }
    
    async addEvent(data: NewEvent): Promise<getEvent> {
        const addEvent = await this._eventRepo.addEvent(data);
        return addEvent;
    }
    
    async getEvent(): Promise<getEvent> {
        throw new Error("Not implemeted");
    }
}