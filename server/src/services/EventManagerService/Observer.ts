export interface Observer<T = unknown> {
    update(eventType: string, payload: T): void;
}
