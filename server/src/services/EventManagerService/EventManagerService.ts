import { injectable } from 'inversify';
import { Observer } from './Observer';

@injectable()
export default class EventManagerService {
    private observers: Map<string, Observer[]> = new Map();

    subscribe(eventType: string, observer: Observer) {
        if (!this.observers.has(eventType)) {
            this.observers.set(eventType, []);
        }
        this.observers.get(eventType)!.push(observer);
    }

    unsubscribe(eventType: string, observer: Observer) {
        const list = this.observers.get(eventType);
        if (!list) return;
        this.observers.set(
            eventType,
            list.filter(obs => obs !== observer)
        );
    }

    notify<T = any>(eventType: string, payload: T) {
        const list = this.observers.get(eventType);
        if (!list) return;
        list.forEach(observer => observer.update(eventType, payload));
    }
}
