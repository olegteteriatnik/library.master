import { Observer } from '../Observer';

export interface EventManagerService {
    subscribe(eventType: string, observer: Observer): void;
    notify<T = unknown>(eventType: string, payload: T): void;
}
