export interface Observer<T = any> {
    update(eventType: string, payload: T): void;
}
