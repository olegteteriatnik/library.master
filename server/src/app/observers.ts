import container from '../container/applicationContainer';
import Types from '../../params/constants/types';
import EventManagerService from '../services/EventManagerService/EventManagerService';
import { LoggerObserver } from '../services/EventManagerService/LoggerObserver';

export function initializeObservers(): void {
    const eventManager = container.get<EventManagerService>(Types.EventManagerService);
    const loggerObserver = container.get(LoggerObserver);

    eventManager.subscribe('bookCreated', loggerObserver);
    eventManager.subscribe('bookUpdated', loggerObserver);
    eventManager.subscribe('bookDeleted', loggerObserver);
}
