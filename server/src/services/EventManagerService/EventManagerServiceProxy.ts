import { injectable, inject } from 'inversify';
import { EventManagerService as EventManagerServiceInterface } from './interfaces/EventManagerService';
import { Observer } from './Observer';
import Types from '../../../params/constants/types';

@injectable()
export default class EventManagerServiceProxy implements EventManagerServiceInterface {
    constructor(
        @inject(Types.EventManagerServiceInterface) private realService: EventManagerServiceInterface
    ) {}

    subscribe(eventType: string, observer: Observer) {
        this.realService.subscribe(eventType, observer);
    }

    notify<T = any>(eventType: string, payload: T) {
        this.realService.notify(eventType, payload);
    }
}
