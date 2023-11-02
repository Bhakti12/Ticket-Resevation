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
        const getEvent = await this._eventRepo.getEvent();
        return getEvent;
    }

    async getEventById(eventId: BigInt): Promise<getEvent> {
        const getEventbyUserId = await this._eventRepo.getEventById(eventId);
        return getEventbyUserId;
    }

    async editEvent(data: NewEvent, userId: BigInt): Promise<getEvent> {
        throw new Error("Method not implemented.");
    }

    async statusChangeOfEvent(eventId: BigInt, status: string): Promise<getEvent> {
        const changeStatus = await this._eventRepo.statusChangeOfEvent(eventId,status);
        return changeStatus;
    }
}