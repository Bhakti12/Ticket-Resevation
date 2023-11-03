import { inject, injectable } from "inversify";
import { IEventRepository } from "../Interface/IEventRepo";
import { IEventService } from "../Interface/IEventService";
import { NewEvent, getEvent } from "../Type/Event";
import { TYPES } from "../Config/types";
import { AllError } from "../Error/ErrorCases";

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
        const getEvent = await this._eventRepo.getEvent();

        if(!getEvent){
            throw new AllError("There aren't any event, make new event","Not Found");
        }

        return getEvent;
    }

    async getEventById(eventId: BigInt): Promise<getEvent> {
        const getEventbyUserId = await this._eventRepo.getEventById(eventId);

        if(!getEventbyUserId){
            throw new AllError("Event not found","Not Found");
        }

        return getEventbyUserId;
    }

    async editEvent(data: NewEvent, eventId: BigInt): Promise<getEvent> {
        const getEvent = await this._eventRepo.getEventById(eventId);

        if(!getEvent){
            throw new AllError("Event not found","Not Found");
        }

        const editEvent = await this._eventRepo.editEvent(data,eventId);
        return editEvent;
    }

    async statusChangeOfEvent(eventId: BigInt, status: string): Promise<getEvent> {
        const getEvent = await this._eventRepo.getEventById(eventId);

        if(!getEvent){
            throw new AllError("Event not found","Not Found");
        }

        const changeStatus = await this._eventRepo.statusChangeOfEvent(eventId,status);
        return changeStatus;
    }

    async deleteEvent(eventId: BigInt): Promise<any> {
        const getEvent = await this._eventRepo.getEventById(eventId);

        if(!getEvent){
            throw new AllError("Event not found","Not Found");
        }

        const deletEventById = await this._eventRepo.deleteEvent(eventId);
        return deletEventById;
    }
}